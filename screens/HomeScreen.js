import { View, Text, SafeAreaView, StyleSheet, StatusBar } from "react-native";
import React, { useState } from "react";
import { format } from "date-fns";
import { Button } from "../components/Button";

export const HomeScreen = () => {
  const [filter, setFilter] = useState("todo"); // ["all", "done", "todo]"
  const date = format(new Date(), "dd MMMM, yyyy");
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaView style={styles.container}>
        <Text style={styles.DateText}>{date}</Text>
        <Text style={styles.Header}>Today's tasks</Text>
        <View style={styles.buttonsWrapper}>
          <Button title="to do" onPress={() => setFilter("todo")} selected={filter === "todo"} />
          <Button title="done" onPress={() => setFilter("done")} selected={filter === "done"} />
          <Button title="all" onPress={() => setFilter("all")} selected={filter === "all"} />
        </View>
        <View></View>
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
