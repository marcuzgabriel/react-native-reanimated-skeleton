import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SkeletonExample from "react-native-reanimated-skeleton/src/example";
import ImageWithLoadingEvents from "./ImageLoadExample";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      {/* <SkeletonExample /> */}
      {/* https://github.com/marcuzgabriel/react-native-reanimated-skeleton/issues/19 */}
      <ImageWithLoadingEvents />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
