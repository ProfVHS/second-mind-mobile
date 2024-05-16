import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

interface ModalAlertProps {
  modalVisible: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  description: string;
  submitText: string;
  type: "Warning";
}

export const ModalAlert = ({
  modalVisible,
  onClose,
  onSubmit,
  title,
  description,
  submitText,
  type,
}: ModalAlertProps) => {
  const handleSubmit = () => {
    onSubmit();
    onClose();
  };
  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      animationType="fade"
      style={styles.wrapper}>
      <Pressable style={styles.backdrop} onPress={() => onClose()} />
      <View style={styles.center}>
        <View style={styles.content}>
          {type === "Warning" && (
            <Image
              style={styles.icon}
              source={require("../assets/WarningIcon.png")}
            />
          )}
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              width: "100%",
              marginTop: 20,
            }}>
            <TouchableOpacity onPress={() => onClose()}>
              <Text style={styles.cancelBtn}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit}>
              <Text style={type === "Warning" ? styles.warningBtn : null}>
                {submitText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    width: "95%",
    maxHeight: 300,
    borderRadius: 10,

    padding: 20,
  },
  icon: {
    height: 50,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    marginVertical: 20,
    fontFamily: "Poppins-SemiBold",
  },
  description: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    textAlign: "center",
  },
  warningBtn: {
    color: "#FFF",
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    paddingHorizontal: 32,
    paddingVertical: 8,
    backgroundColor: "#BA0B4A",
    borderRadius: 8,
  },
  cancelBtn: {
    color: "#000",
    fontSize: 18,
    paddingHorizontal: 32,
    paddingVertical: 8,
    fontFamily: "Poppins-SemiBold",
  },
});
