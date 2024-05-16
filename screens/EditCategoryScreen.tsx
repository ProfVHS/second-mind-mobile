import {
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Pressable,
  View,
  ToastAndroid,
  StatusBar,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { categoryType } from "../types";

import { NavigationProp, RouteProp } from "@react-navigation/native";
import { connectToDatabase } from "../database/database";
import { addCategory, editCategoryById } from "../database/category";

interface AddCategoryScreenProps {
  navigation: NavigationProp<any>;
  route: RouteProp<any, any>;
}

export const EditCategoryScreen = ({
  navigation,
  route,
}: AddCategoryScreenProps) => {
  const categoryToEdit = route.params!.categoryToEdit;
  const [categoryName, setCategoryName] = useState<string>("");
  const [error, setError] = useState<"tooShort" | "empty" | null>();

  const handleCategoryNameChange = (newCategoryName: string) => {
    setCategoryName(newCategoryName);
  };

  const resetInputs = () => {
    setCategoryName(categoryToEdit.name);
  };

  const handleSubmitEditCategory = async () => {
    if (categoryName === "") {
      ToastAndroid.show("Category name cannot be empty", ToastAndroid.SHORT);
      setError("empty");
      return;
    }
    if (categoryName.length < 3) {
      ToastAndroid.show(
        "Category name must be at least 3 characters long",
        ToastAndroid.SHORT
      );
      setError("tooShort");
      return;
    }

    const newCategory: categoryType = {
      name: categoryName,
    };

    const db = await connectToDatabase();
    editCategoryById(db, categoryToEdit.id, newCategory);

    resetInputs();
    navigation.goBack();
  };

  // on focus listener
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      resetInputs();
    });
    return unsubscribe;
  });

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaView style={styles.container}>
        <Text style={styles.Header}>Adding new category</Text>
        <TextInput
          style={[styles.input, error ? styles.errorBorder : null]}
          defaultValue={categoryName}
          onChangeText={handleCategoryNameChange}
          placeholder="Category name"
          placeholderTextColor="rgba(0, 0, 0, 0.2)"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleSubmitEditCategory()}>
          <Text style={styles.buttonText}>Edit category</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  label: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "rgba(0,0,0,0.8)",
    marginLeft: 6,
    marginTop: 12,
  },
  button: {
    backgroundColor: "#FC69D3",
    padding: 12,
    borderRadius: 5,
    marginVertical: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
    color: "#fff",
  },
  Header: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
  },
  input: {
    height: 45,
    marginVertical: 12,
    borderRadius: 5,
    padding: 5,
    backgroundColor: "#D9D9D9",
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    justifyContent: "center",
    alignContent: "center",
    color: "#000",
  },
  categoryPicker: {
    width: "45%",
    justifyContent: "center",
  },
  priorityPicker: {
    width: "45%",
    justifyContent: "center",
  },
  datePicker: {
    height: 45,
    width: "60%",
    marginVertical: 12,
    borderRadius: 5,
    padding: 5,
    backgroundColor: "#D9D9D9",
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    justifyContent: "center",
    alignContent: "center",
    color: "#000",
  },
  datePickerText: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "rgba(0,0,0,0.8)",
  },
  timePicker: {
    height: 45,
    width: "35%",
    marginVertical: 12,
    borderRadius: 5,
    padding: 5,
    backgroundColor: "#D9D9D9",
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    justifyContent: "center",
    alignContent: "center",
    color: "#000",
  },
  timePickerText: {
    alignSelf: "center",
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "rgba(0,0,0,0.8)",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  errorBorder: {
    borderColor: "red",
    borderWidth: 2,
  },
  cancelButton: {
    backgroundColor: "#FFF",
    padding: 12,
    borderWidth: 3,
    borderColor: "#FC69D3",
    borderRadius: 5,
    marginVertical: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButtonText: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
    color: "#FC69D3",
  },
});
