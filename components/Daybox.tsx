import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Shadow } from "react-native-shadow-2";
import { format, isToday } from "date-fns";

type DayboxProps = {
  day: Date;
  onPress: () => void;
  selected?: boolean;
};

export const Daybox = ({ day, onPress, selected }: DayboxProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.day, isToday(day) ? styles.today : null]}>
      <Text style={[styles.text, selected ? styles.selected : null]}>
        {format(day, "d")}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  day: {
    width: 40,
    height: 40,
    borderRadius: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    elevation: 3,
  },
  text: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    textAlign: "center",
  },
  today: {
    borderColor: "#FC69D3",
    borderStyle: "solid",
    borderBottomWidth: 2,
  },
  selected: {
    backgroundColor: "#FC69D3",
    color: "#fff",
    paddingHorizontal: 4,
    borderRadius: 4,
  },
});
