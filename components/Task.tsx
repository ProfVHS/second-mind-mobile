import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { taskType } from "../types";
import { Shadow } from "react-native-shadow-2";
import { addDays, formatDistance, formatDistanceToNow } from "date-fns";

type TaskProps = {
  task: taskType;
};
export const Task = ({ task }: TaskProps) => {
  const date = new Date(task.DueDate);
  const timeLeft = formatDistanceToNow(date, { addSuffix: true });
  return (
    <View style={styles.container}>
      <Shadow
        distance={1}
        offset={[0, 8]}
        stretch={true}
        style={styles.taskbox}>
        <View style={styles.content}>
          <View
            style={[
              styles.priorityDot,
              task.priority === "high"
                ? styles.priorityHigh
                : task.priority === "medium"
                ? styles.priorityMedium
                : styles.priorityLow,
            ]}></View>
          <View>
            <Text style={styles.taskName}>{task.title}</Text>
            <Text style={styles.taskTimeLeft}>{timeLeft}</Text>
            <Text style={styles.taskDescription}>{task.description}</Text>
          </View>
          <Text style={styles.taskCategory}>Category</Text>
        </View>
      </Shadow>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 6,
  },
  taskbox: {
    marginVertical: 5,
  },
  content: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,

    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  taskName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  taskDescription: {
    fontSize: 16,
    fontWeight: "500",
    color: "#A2A2A2",
  },
  taskCategory: {
    fontSize: 12,
    fontWeight: "500",
    color: "#A2A2A2",

    position: "absolute",
    right: 8,
    top: 4,
  },
  taskTimeLeft: {
    fontSize: 12,
    fontWeight: "600",
    color: "#A2A2A2",
  },
  priorityDot: {
    width: 10,
    height: 10,
    borderRadius: 100,
    marginVertical: 10,
  },
  priorityHigh: {
    backgroundColor: "#FC3BE8",
  },
  priorityMedium: {
    backgroundColor: "#3B93FC",
  },
  priorityLow: {
    backgroundColor: "#5DC5D3",
  },
});
