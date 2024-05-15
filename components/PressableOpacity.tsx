import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import Animated, { useSharedValue } from "react-native-reanimated";

type PressableHighlightProps = {
  children: React.ReactNode;
  style: StyleProp<ViewStyle>;
  onPress?: () => void;
};

export const PressableOpacity = ({
  children,
  style,
  onPress,
}: PressableHighlightProps) => {
  const highlight = useSharedValue(0);

  const handlePressIn = () => {
    highlight.value = 1;
    onPress!();
  };
  return (
    <Pressable onPress={onPress!}>
      <Animated.View style={[style, { opacity: 1 }]}>{children}</Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({});
