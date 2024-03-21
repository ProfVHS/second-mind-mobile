import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";

export const HomeScreen = () => {
  return (
    <SafeAreaView>
      <Text style={styles.Header}>Today's tasks</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  Header: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
  },
});
