import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import { Button } from "../components/Button";
import {
  connectToDatabase,
  deleteTaskById,
  getTasks,
  setTaskStatus,
} from "../database/database";
import { Task } from "../components/Task";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { filter, taskType } from "../types";
import { getTasksInCategory } from "../database/category";

interface ViewCategoryScreenProps {
  navigation: NavigationProp<any>;
  route: RouteProp<any, any>;
}

export const ViewCategoryScreen = ({
  navigation,
  route,
}: ViewCategoryScreenProps) => {
  const categoryToView = route.params!.categoryID;
  const [filter, setFilter] = useState<filter>("todo");
  const date = format(new Date(), "dd MMMM, yyyy");

  const [tasks, setTasks] = useState<taskType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      const db = await connectToDatabase();
      await getTasksInCategory(db, filter, categoryToView.id, setTasks);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // on focus listener
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      console.log("Home screen focused");
      loadData();
    });

    return unsubscribe;
  }, []);

  const handleDeleteTask = async (taskID: number) => {
    const db = await connectToDatabase();
    await deleteTaskById(db, taskID);
    await loadData();
  };

  const handleEditTask = (task: taskType) => {
    console.log("Editing task", task);
    navigation.navigate("ViewCategory", {
      screen: "EditTask",
      params: { taskToEdit: task },
    });
  };

  const handleTaskStatusChange = async (task: taskType) => {
    const db = await connectToDatabase();
    await setTaskStatus(db, task.id!, !task.isDone);
    await getTasksInCategory(db, filter, categoryToView.id, setTasks);
  };

  const handleChangeFilter = async (filter: filter) => {
    setFilter(filter);
    setIsLoading(true);
    setTasks([]);
    const db = await connectToDatabase();
    await getTasksInCategory(db, filter, categoryToView.id, setTasks);
    setIsLoading(false);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaView style={styles.container}>
        <View style={styles.Header}>
          <Text style={styles.DateText}>{date}</Text>
          <Text style={styles.Title}>{categoryToView.name}'s tasks</Text>
          <View style={styles.buttonsWrapper}>
            <Button
              title="to do"
              onPress={() => handleChangeFilter("todo")}
              selected={filter === "todo"}
            />
            <Button
              title="done"
              onPress={() => handleChangeFilter("done")}
              selected={filter === "done"}
            />
            <Button
              title="all"
              onPress={() => handleChangeFilter("all")}
              selected={filter === "all"}
            />
          </View>
        </View>
        {!isLoading ? (
          <FlatList
            style={styles.Tasks}
            data={tasks}
            renderItem={({ item }) => (
              <Task
                task={item}
                onDelete={() => handleDeleteTask(item.id!)}
                onEdit={() => handleEditTask(item)}
                onStatusChange={() => handleTaskStatusChange(item)}
                category={categoryToView.name}
              />
            )}
            keyExtractor={(item) => item.id!.toString()}
          />
        ) : (
          <ActivityIndicator size="large" color="#FC69D3" />
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  buttonsWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 50,
    marginBottom: 20,
  },
  DateText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: "#A2A2A2",
  },
  Header: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  Title: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
  },
  Tasks: {
    height: "100%",
    width: "100%",
  },
});
