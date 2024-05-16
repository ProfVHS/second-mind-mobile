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
import GestureRecognizer from "react-native-swipe-gestures";

type TaskProps = {
  task: taskType;
  category: string;
  onDelete: () => void;
  onEdit: () => void;
  onStatusChange: () => void;
};
export const Task = ({
  task,
  category,
  onDelete,
  onEdit,
  onStatusChange,
}: TaskProps) => {
  const leftPositionTask = useSharedValue(0);
  const leftPositionOptions = useSharedValue(0);

  const [currentState, setCurrentState] = useState<"Edit" | "Done" | "Info">(
    "Info"
  );

  const date = new Date(task.DueDate);
  const timeLeft = formatDistanceToNow(date, { addSuffix: true });

  const swipeLeft = () => {
    const newCurrentState = currentState === "Info" ? "Edit" : "Info";
    setCurrentState(newCurrentState);
  };

  const swipeRight = () => {
    const newCurrentState = currentState === "Info" ? "Done" : "Info";
    setCurrentState(newCurrentState);
  };

  useEffect(() => {
    leftPositionTask.value = withTiming(
      currentState === "Info" ? 0 : currentState === "Edit" ? -75 : 75,
      { duration: 200 }
    );
    leftPositionOptions.value = withTiming(
      currentState === "Info" ? 0 : currentState === "Edit" ? -75 : 75,
      {
        duration: 200,
      }
    );
  }, [currentState]);

  return (
    <Animated.View style={{ left: leftPositionTask, position: "relative" }}>
      <GestureRecognizer
        style={styles.container}
        onSwipeLeft={swipeLeft}
        onSwipeRight={swipeRight}>
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
            style={{ height: "100%" }}
            onPress={() => onStatusChange()}>
            <View style={styles.done}>
              {task.isDone ? (
                <Image
                  source={require("../assets/CancelIcon.png")}
                  style={styles.optionIcon}
                />
              ) : (
                <Image
                  source={require("../assets/DoneIcon.png")}
                  style={styles.optionIcon}
                />
              )}
            </View>
          </TouchableOpacity>
          <View>
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
            <TouchableOpacity style={{ height: "50%" }} onPress={onEdit}>
              <View style={styles.edit}>
                <Image
                  source={require("../assets/EditIcon.png")}
                  style={styles.optionIcon}
                />
              </View>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </GestureRecognizer>
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
    width: "100%",
    height: "100%",
    position: "absolute",
    borderRadius: 10,
    zIndex: -1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  edit: {
    height: "100%",
    width: 85,
    paddingLeft: 10,

    backgroundColor: "#3B93FC",
    borderBottomRightRadius: 10,

    display: "flex",
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
  },
  delete: {
    height: "100%",
    width: 85,
    paddingLeft: 10,

    backgroundColor: "#BA0B4A",
    borderTopRightRadius: 10,

    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
  },
  done: {
    height: "100%",
    width: 85,
    backgroundColor: "#d30c9e",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,

    alignItems: "center",
    justifyContent: "center",
  },
  optionIcon: {
    height: 20,
    resizeMode: "contain",
  },
});
