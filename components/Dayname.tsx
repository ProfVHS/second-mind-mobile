import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Shadow } from "react-native-shadow-2";

type DaynameProps = {
  day: string;
};

export const Dayname = ({ day }: DaynameProps) => {
  return (
    <Shadow distance={1} offset={[0, 2]}>
      <View style={styles.dayName}>
        <Text>{day}</Text>
      </View>
    </Shadow>
  );
};

const styles = StyleSheet.create({
  dayName: {
    width: 40,
    height: 30,
    borderRadius: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
});
