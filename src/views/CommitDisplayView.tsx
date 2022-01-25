import React from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TextInput, Button } from "react-native";
import {
  COMMIT_COUNT,
  DEFAULT_REPO,
  DEFAULT_USER,
  getRepoCommits,
  getRepoData,
  HASH_LENGTH,
} from "../api/GithubAPI";
import {
  GithubRepoData,
  GithubRepoCommitData,
  GithubRepoCommit,
} from "../api/Types";

const styles = StyleSheet.create({
  padBottom: {
    marginBottom: 10,
  },
  flexRow: {
    flexDirection: "row",
  },

  container: {
    backgroundColor: "#fff",
    alignItems: "center",
  },
  columnLeft: {
  },
  rowCenter: {
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
  },

  commitList: {
    flexGrow: 1,
  },

  textField: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    width: 240,
    marginLeft: 10,
    backgroundColor: "#999",
  },
});

const CommitDisplayView = function () {
  const [inputUser, onChangeInputUser] = React.useState(DEFAULT_USER);
  const [inputRepo, onChangeInputRepo] = React.useState(DEFAULT_REPO);

  const [repoDesc, setRepoDesc] = React.useState("No repo selected");

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
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} backgroundColor="#333" hidden={false} />
      <View style={[styles.padBottom]}>
        <Text>Github Commits</Text>
      </View>
      <View style={[styles.padBottom, styles.flexRow]}>
        <Text>Username</Text>
        <TextInput
          style={styles.textField}
          onChangeText={(text) => onChangeInputUser(text)}
          value={inputUser}
        />
      </View>
      <View style={[styles.padBottom, styles.flexRow]}>
        <Text>Repository</Text>
        <TextInput
          style={styles.textField}
          onChangeText={(text) => onChangeInputRepo(text)}
          value={inputRepo}
        />
      </View>
      <View style={[styles.padBottom, styles.rowCenter]}>
        <Button title="Fetch" onPress={onClickFetch} />
      </View>
      <Text style={[styles.padBottom, styles.rowCenter]}>{repoDesc}</Text>
      <Text style={[styles.padBottom, styles.rowCenter]}>Commit Messages</Text>
      <FlatList
        data={commits}
        style={[styles.padBottom, styles.commitList]}
        keyExtractor={(item) => item.sha.substring(0, HASH_LENGTH)}
        renderItem={({
          item: {
            sha,
            commit: {
              author: { date },
              message,
            },
          },
        }) => (
          <View key={sha} style={[styles.padBottom, styles.columnLeft]}>
            <Text>
              {sha.substring(0, HASH_LENGTH)} : {date}
            </Text>
            {
              // Correctly display commit messages with multiple lines.
              message
                .split("\n")
                .filter((line) => line.length > 0)
                .map((line) => (
                  <Text key={line}>{line}</Text>
                ))
            }
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default CommitDisplayView;
