import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { categoryType } from "../types";
import { Shadow } from "react-native-shadow-2";
import { formatDistanceToNow } from "date-fns";
import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { connectToDatabase, deleteTaskById } from "../database/database";
import GestureRecognizer from "react-native-swipe-gestures";
import { ModalAlert } from "./ModalAlert";

type CategoryProps = {
  category: categoryType;
  onDelete: () => void;
  onEdit: () => void;
  onView: () => void;
};
export const Category = ({
  category,
  onDelete,
  onEdit,
  onView,
}: CategoryProps) => {
  const leftPositionTask = useSharedValue(0);
  const leftPositionOptions = useSharedValue(0);

  const [currentState, setCurrentState] = useState<"Edit" | "Done" | "Info">(
    "Info"
  );

  const loadCategory = useCallback(async () => {
    try {
      const db = await connectToDatabase();
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadCategory();
  }, [loadCategory]);

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
    <Animated.View
      style={{ left: leftPositionTask, position: "relative" }}
      onLayout={loadCategory}>
      <GestureRecognizer
        style={styles.container}
        onSwipeLeft={swipeLeft}
        onSwipeRight={swipeRight}>
        <Shadow distance={1} offset={[0, 4]} stretch={true}>
          <View style={styles.content}>
            <View style={styles.dot} />
            <Text style={styles.categoryName}>{category.name}</Text>
          </View>
        </Shadow>
        <Animated.View style={[styles.options, { right: leftPositionOptions }]}>
          <TouchableOpacity style={{ height: "100%" }} onPress={() => onView()}>
            <View style={styles.done}>
              <Image
                source={require("../assets/ViewIcon.png")}
                style={styles.optionIcon}
              />
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

    height: 75,

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  categoryName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  tasksToDo: {
    fontSize: 16,
    fontWeight: "500",
    color: "#A2A2A2",
  },
  tasksDone: {
    fontSize: 12,
    fontWeight: "600",
    color: "#A2A2A2",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 100,
    marginVertical: 10,
    backgroundColor: "#FC3BE8",
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
