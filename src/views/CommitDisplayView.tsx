import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput, Button } from "react-native";
import { COMMIT_COUNT, DEFAULT_REPO, DEFAULT_USER, getRepoCommits, getRepoData, HASH_LENGTH } from "../api/GithubAPI";
import { GithubRepoData, GithubRepoCommitData, GithubRepoCommit } from "../api/Types";

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: "#fff",
    // Center items.
    alignItems: "center",
    justifyContent: "flex-start",
    // Padding on sides.
    width: '60%',
    height: '100%',
    margin: 'auto',
  },
  rowFull: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",

    marginBottom: 10,
    flexGrow: 0,
    minHeight: 24,
  },
  columnLeft: {
    justifyContent: "flex-start",

    marginBottom: 10,
    minHeight: 24,
  },
  rowCenter: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",

    marginBottom: 10,
    flexGrow: 0,
    minHeight: 32,
  },

  rowCommit: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    flexShrink: 0,
    flexGrow: 1,
  },
  containerCommit: {
    display: 'flex',
    flexGrow: 1,
    flexShrink: 0,
  },
  textField: {
    border: "1px solid black",
    borderRadius: 5,
    marginLeft: 10,
    backgroundColor: "#999",
  },
  rowEnd: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

const CommitDisplayView = function () {
  const [inputUser, onChangeInputUser] = React.useState(DEFAULT_USER);
  const [inputRepo, onChangeInputRepo] = React.useState(DEFAULT_REPO);

  const [repoDesc, setRepoDesc] = React.useState('No repo selected');

  const [commits, setCommits] = React.useState<Array<GithubRepoCommit>>([]);

  const onClickFetch = async function () {
    const repoData: GithubRepoData = await getRepoData(inputUser, inputRepo);
    const commitData: GithubRepoCommitData = await getRepoCommits(
      inputUser,
      inputRepo
    );

    setCommits(commitData.slice(0, COMMIT_COUNT));

    if (repoData.description != null) {
      setRepoDesc(repoData.full_name + " : " + repoData.description);
    } else {
      setRepoDesc(repoData.full_name);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowFull}>
        <Text>Github Commits</Text>
      </View>
      <View style={styles.rowFull}>
        <Text>Username</Text>
        <TextInput
          style={styles.textField}
          onChangeText={(text) => onChangeInputUser(text)}
          value={inputUser}
        />
      </View>
      <View style={styles.rowFull}>
        <Text>Repository</Text>
        <TextInput
          style={styles.textField}
          onChangeText={(text) => onChangeInputRepo(text)}
          value={inputRepo}
        />
      </View>
      <View style={styles.rowCenter}>
        <Button title="Fetch" onPress={onClickFetch} />
      </View>
      <View style={styles.containerCommit}>
          <View style={styles.rowCenter}>
            <Text>{repoDesc}</Text>
          </View>
          <View style={styles.rowCenter}>
            <Text>Commit Messages</Text>
          </View>
          {commits.map(({sha, commit: {author: {date}, message}}) => (
            <View style={styles.columnLeft}>
              <Text>{sha.substring(0, HASH_LENGTH)} : {date}</Text>
              {
                // Correctly display commit messages with multiple lines.
                message.split("\n").filter(line => line.length > 0)
                  .map(line => <Text>{line}</Text>)
              }
            </View>
          ))}
        </View>
    </View>
  );
};

export default CommitDisplayView;
