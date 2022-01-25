import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {TextInput, Button} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'},
  rowEnd: {flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems:'center'},
});

const CommitDisplayView = function () {
  const [commitMessages, setCommitMessages] = React.useState<Record<keyof any, String>>({});

  const onClickFetch = function() {

  };

  return (
    <View style={styles.container}>
      <View style = {styles.row}>
        <Text>Github Commits</Text>
        <TextInput />
      </View>
      <View style = {styles.row}>
        <Text>Username</Text>
        <TextInput />
      </View>
      <View style = {styles.row}>
        <Text>Repository</Text>
        <TextInput />
      </View>
      <View style = {styles.rowEnd}>
        <Button
          title="Fetch"
          onPress={onClickFetch} />
      </View>
      {Object.entries(commitMessages).map(([hash, message]) => (
        <View style={styles.row}>
          <Text>{hash}</Text>
          <Text>{message}</Text>
        </View>
      ))}
    </View>
  );
}

export default CommitDisplayView;