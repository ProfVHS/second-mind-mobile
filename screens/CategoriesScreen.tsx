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
import { getCategories } from "../database/category";
import { categoryType } from "../types";
import { Category } from "../components/Category";
import { NavigationProp } from "@react-navigation/native";

interface CategoriesScreenProps {
  navigation: NavigationProp<any>;
}

export const CategoriesScreen = ({ navigation }: CategoriesScreenProps) => {
  const [categories, setCategories] = useState<categoryType[]>([]); // [id, categoryName]

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
      console.log("Home screen focused");
      loadData();
    });

    return unsubscribe;
  }, []);

  const handleDeleteCategory = () => {};

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
              onDelete={() => handleDeleteCategory()}
              onEdit={() => handleEditCategory(item)}
              onView={() => handleViewCategory()}
            />
          )}
        />
      </SafeAreaView>
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
});
