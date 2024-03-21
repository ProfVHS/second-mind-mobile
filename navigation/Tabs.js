import { View, Image } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/HomeScreen";
import { CategoriesScreen } from "../screens/CategoriesScreen";

const Tab = createBottomTabNavigator();

export const Tabs = () => {
  return (
    <Tab.Navigator screenOptions={{ tabBarShowLabel: false, headerShown: false, tabBarStyle: { backgroundColor: "#000000" } }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image source={require("../assets/home.png")} resizeMode="contain" style={{ width: 25, height: 25, tintColor: focused ? "#FFFFFF" : "#A2A2A2" }} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image source={require("../assets/categories.png")} resizeMode="contain" style={{ width: 25, height: 25, tintColor: focused ? "#FFFFFF" : "#A2A2A2" }} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
