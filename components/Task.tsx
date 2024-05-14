import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { taskType } from "../types";
interface TaskProps {
  task: taskType;
}
export const Task = ({ task }: TaskProps) => {
  return (
    <View>
      <Text>Task</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
