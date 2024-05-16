import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { CategoriesScreen } from "../screens/CategoriesScreen";
import { EditCategoryScreen } from "../screens/EditCategoryScreen";
import { CategoryViewStack } from "./CategoryViewStack";
import { NavigationProp } from "@react-navigation/native";

const Stack = createStackNavigator();

interface CategoriesStackProps {
  navigation: NavigationProp<any>;
}
export const CategoriesStack = ({ navigation }: CategoriesStackProps) => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="CategoriesScreen">
      <Stack.Screen name="CategoriesScreen" component={CategoriesScreen} />
      <Stack.Screen
        name="EditCategory"
        component={EditCategoryScreen}
        options={{ presentation: "modal" }}
      />
      <Stack.Screen name="ViewCategory" component={CategoryViewStack} />
    </Stack.Navigator>
  );
};
