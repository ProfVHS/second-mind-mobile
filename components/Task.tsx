import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { taskType } from "../types";
import { Shadow } from "react-native-shadow-2";
import { addDays, formatDistance, formatDistanceToNow } from "date-fns";
import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { connectToDatabase, deleteTaskById } from "../database/database";

type TaskProps = {
  task: taskType;
  category: string;
  onDelete: () => void;
};
export const Task = ({ task, category, onDelete }: TaskProps) => {
  const leftPositionTask = useSharedValue(0);
  const leftPositionOptions = useSharedValue(0);

  const [isInEditMode, setIsInEditMode] = useState(false);

  const date = new Date(task.DueDate);
  const timeLeft = formatDistanceToNow(date, { addSuffix: true });

  const handlePress = () => {
    setIsInEditMode((prev) => !prev);
  };

  useEffect(() => {
    leftPositionTask.value = withTiming(isInEditMode ? -75 : 0, {
      duration: 200,
    });
    leftPositionOptions.value = withTiming(isInEditMode ? -75 : 0, {
      duration: 200,
    });
  }, [isInEditMode]);

  return (
    <Animated.View style={{ left: leftPositionTask, position: "relative" }}>
      <Pressable style={styles.container} onPress={handlePress}>
        <Shadow distance={1} offset={[0, 4]} stretch={true}>
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
            <Text style={styles.taskCategory}>{category}</Text>
          </View>
        </Shadow>
        <Animated.View style={[styles.options, { right: leftPositionOptions }]}>
          <TouchableOpacity
            style={{ height: "50%" }}
            onPress={() => onDelete()}>
            <View style={styles.delete}>
              <Image
                source={require("../assets/DeleteIcon.png")}
                style={styles.optionIcon}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ height: "50%" }}>
            <View style={styles.edit}>
              <Image
                source={require("../assets/EditIcon.png")}
                style={styles.optionIcon}
              />
            </View>
          </TouchableOpacity>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginVertical: 8,
    marginHorizontal: 6,
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
  options: {
    width: 85,
    height: "100%",
    position: "absolute",
    borderRadius: 10,
    zIndex: -1,
  },
  edit: {
    height: "100%",
    width: "100%",
    backgroundColor: "#3B93FC",
    borderBottomRightRadius: 10,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  delete: {
    height: "100%",
    width: "100%",
    backgroundColor: "#BA0B4A",
    borderTopRightRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  optionIcon: {
    marginLeft: 10,
    height: 20,
    resizeMode: "contain",
  },
});
