import React from "react";
import { StyleSheet, View } from "react-native";
import ImageViewer from "./ImageViewer";

export default function App() {
  return (
    <View style={styles.container}>
      <ImageViewer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
