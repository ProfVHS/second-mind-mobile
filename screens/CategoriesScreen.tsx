import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  FlatList,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { connectToDatabase } from "../database/database";
import { deleteCategoryById, getCategories } from "../database/category";
import { categoryType } from "../types";
import { Category } from "../components/Category";
import { NavigationProp } from "@react-navigation/native";
import { ModalAlert } from "../components/ModalAlert";

interface CategoriesScreenProps {
  navigation: NavigationProp<any>;
}

export const CategoriesScreen = ({ navigation }: CategoriesScreenProps) => {
  const [categories, setCategories] = useState<categoryType[]>([]); // [id, categoryName]
  const [modalVisible, setModalVisible] = useState(false);
  const [toDelete, setToDelete] = useState<number | null>(null);

  const loadData = useCallback(async () => {
    try {
      const db = await connectToDatabase();
      await getCategories(db, setCategories);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // on focus listener
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      loadData();
    });

    return unsubscribe;
  }, []);

  const handleDeleteCategory = (id: number) => {
    setToDelete(id);
    setModalVisible(true);
  };

  const deleteCategory = async () => {
    const db = await connectToDatabase();
    await deleteCategoryById(db, toDelete!);
    await getCategories(db, setCategories);
  };

  const handleEditCategory = (category: categoryType) => {
    navigation.navigate("Categories", {
      screen: "EditCategory",
      params: {
        categoryToEdit: category,
      },
    });
  };

  const handleViewCategory = () => {};

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaView style={styles.container}>
        <View style={styles.Header}>
          <Text style={styles.DateText}>
            You have {categories.length} categories
          </Text>
          <Text style={styles.Title}>Your categories</Text>
        </View>
        <FlatList
          data={categories}
          renderItem={({ item }) => (
            <Category
              category={item}
              onDelete={() => handleDeleteCategory(item.id!)}
              onEdit={() => handleEditCategory(item)}
              onView={() => handleViewCategory()}
            />
          )}
        />
      </SafeAreaView>
      <ModalAlert
        title="Are you sure?"
        description="Do you really want to delete this category? If you do, all tasks in this category will be deleted as well."
        type="Warning"
        submitText="Delete"
        modalVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={() => deleteCategory()}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  buttonsWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 50,
  },
  DateText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: "#A2A2A2",
  },
  Header: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  Title: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
  },
  centeredContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
