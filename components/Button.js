import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

export const Button = (props) => {
  const { title, onPress, selected } = props;
  return (
    <Pressable style={selected ? styles.button : styles.buttonSelected} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FC69D3",
    height: 40,
    padding: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 50,
    width: 2,
  },
  buttonSelected: {
    height: 40,
    padding: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 50,
    width: 2,
  },
  buttonText: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: "rgba(0, 0, 0, 0.4)",
    padding: 10,
  },
});
