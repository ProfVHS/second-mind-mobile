import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { CategoriesScreen } from "../screens/CategoriesScreen";
import { EditCategoryScreen } from "../screens/EditCategoryScreen";

const Stack = createStackNavigator();

export const CategoriesStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CategoriesScreen" component={CategoriesScreen} />
      <Stack.Screen
        name="EditCategory"
        component={EditCategoryScreen}
        options={{ presentation: "modal" }}
      />
    </Stack.Navigator>
  );
};
