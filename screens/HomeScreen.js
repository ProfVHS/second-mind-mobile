import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { format } from "date-fns";
import { Button } from "../components/Button";

export const HomeScreen = () => {
  const date = format(new Date(), "dd MMMM, yyyy");
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.DateText}>{date}</Text>
      <Text style={styles.Header}>Today's tasks</Text>
      <View style={styles.buttonsWrapper}>
        <Button title="to do" onPress={() => console.log("To Do")} selected={false} />
        <Button title="done" onPress={() => console.log("Done")} selected={false} />
        <Button title="all" onPress={() => console.log("All")} selected={false} />
      </View>
      <View></View>
    </SafeAreaView>
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
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: "#A2A2A2",
  },
  Header: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
  },
});
