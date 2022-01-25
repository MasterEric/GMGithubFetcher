import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import CommitDisplayView from "./src/views/CommitDisplayView";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const App = function () {
  return <CommitDisplayView />;
};

export default App;
