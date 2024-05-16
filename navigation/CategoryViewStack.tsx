import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { EditTaskScreen } from "../screens/EditTaskScreen";
import { ViewCategoryScreen } from "../screens/ViewCategoryScreen";
import { NavigationProp, Route } from "@react-navigation/native";
import { categoryType } from "../types";

const Stack = createStackNavigator();

interface CategoryViewStackProps {
  navigation: NavigationProp<any>;
  route: Route<any, any>;
}

export const CategoryViewStack = ({
  navigation,
  route,
}: CategoryViewStackProps) => {
  const categoryToView = route.params!.categoryID;
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ViewCategoryScreen"
        component={ViewCategoryScreen}
        initialParams={{ categoryID: categoryToView }}
      />
      <Stack.Screen
        name="EditTask"
        component={EditTaskScreen}
        options={{ presentation: "modal" }}
      />
    </Stack.Navigator>
  );
};
