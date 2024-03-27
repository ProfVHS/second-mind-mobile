import { View, Text, SafeAreaView, StyleSheet, StatusBar } from "react-native";
import React from "react";

export const CategoriesScreen = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaView style={styles.container}>
        <Text style={styles.DateText}>You have 3 categories</Text>
        <Text style={styles.Header}>Your categories</Text>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  buttonsWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 50,
  },
  DateText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: "#A2A2A2",
  },
  Header: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
  },
});
