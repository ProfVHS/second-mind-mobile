import { View, Text, SafeAreaView, StyleSheet, StatusBar } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import { Button } from "../components/Button";
import {
  connectToDatabase,
  createTables,
  fetchData,
} from "../database/database";
import { Task } from "../components/Task";
import { NavigationProp } from "@react-navigation/native";
import { taskType } from "../types";

interface HomeScreenProps {
  navigation: NavigationProp<any>;
}

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [filter, setFilter] = useState("todo"); // ["all", "done", "todo]"
  const date = format(new Date(), "dd MMMM, yyyy");

  const [tasks, setTasks] = useState<taskType[]>([]); // [id, taskName, taskDescription, category_id, priority, date]

  const loadData = useCallback(async () => {
    try {
      const db = await connectToDatabase();
      await createTables(db);
      const todos = fetchData(db, setTasks);
      //await insertData(db);
    } catch (error) {
      console.error(error);
    }
  }, []);

  console.log("tasks", tasks);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // on focus listener
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      console.log("Home screen focused");
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaView style={styles.container}>
        <Text style={styles.DateText}>{date}</Text>
        <Text style={styles.Header}>Today's tasks</Text>
        <View style={styles.buttonsWrapper}>
          <Button
            title="to do"
            onPress={() => setFilter("todo")}
            selected={filter === "todo"}
          />
          <Button
            title="done"
            onPress={() => setFilter("done")}
            selected={filter === "done"}
          />
          <Button
            title="all"
            onPress={() => setFilter("all")}
            selected={filter === "all"}
          />
        </View>
        <View>
          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </View>
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
