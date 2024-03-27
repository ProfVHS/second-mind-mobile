import { StyleSheet, View, Image, Settings, TouchableOpacity } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/HomeScreen";
import { CategoriesScreen } from "../screens/CategoriesScreen";
import { CalendarScreen } from "../screens/CalendarScreen";
import { SettingsScreen } from "../screens/SettingsScreen";
import { AddTaskScreen } from "../screens/AddTaskScreen";

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({ children, onPress }) => (
  <TouchableOpacity style={styles.tabButton} onPress={onPress}>
    <View style={styles.tabButtonView}>{children}</View>
  </TouchableOpacity>
);

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
      <Tab.Screen
        name="AddTask"
        component={AddTaskScreen}
        options={{
          tabBarIcon: ({ focused }) => <Image source={require("../assets/mind.png")} resizeMode="contain" style={{ width: 30, height: 30, tintColor: "#FFF" }} />,
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image source={require("../assets/calendar.png")} resizeMode="contain" style={{ width: 25, height: 25, tintColor: focused ? "#FFFFFF" : "#A2A2A2" }} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image source={require("../assets/settings.png")} resizeMode="contain" style={{ width: 25, height: 25, tintColor: focused ? "#FFFFFF" : "#A2A2A2" }} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabButton: {
    top: -10,
    alignItems: "center",
    justifyContent: "center",
  },
  tabButtonView: {
    width: 50,
    height: 50,
    borderRadius: 35,
    backgroundColor: "#FC69D3",
  },
});
