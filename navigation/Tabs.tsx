import { StyleSheet, View, Image, TouchableOpacity } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CalendarScreen } from "../screens/CalendarScreen";
import { SettingsScreen } from "../screens/SettingsScreen";
import { AddTaskScreen } from "../screens/AddTaskScreen";
import { HomeStack } from "./HomeStack";
import { useState } from "react";
import { AddCategoryScreen } from "../screens/AddCategoryScreen";
import { CategoriesStack } from "./CategoriesStack";
import { ViewCategoryScreen } from "../screens/ViewCategoryScreen";

const Tab = createBottomTabNavigator();

interface TabBarCustomButtonProps {
  children: any;
  onPress: any;
}

const TabBarCustomButton = ({ children, onPress }: TabBarCustomButtonProps) => (
  <View style={styles.tabButtonOutter}>
    <TouchableOpacity style={styles.tabButton} onPress={onPress}>
      <View style={styles.tabButtonView}>{children}</View>
    </TouchableOpacity>
  </View>
);

export const Tabs = () => {
  const [addButtonScreen, setAddButtonScreen] = useState<"TASK" | "CATEGORY">(
    "TASK"
  );

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: { backgroundColor: "#000000" },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        listeners={{ focus: () => setAddButtonScreen("TASK") }}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../assets/home.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#FFFFFF" : "#A2A2A2",
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoriesStack}
        listeners={({ navigation, route }) => ({
          focus: () => setAddButtonScreen("CATEGORY"),
        })}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../assets/categories.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#FFFFFF" : "#A2A2A2",
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="AddTask"
        component={
          addButtonScreen === "TASK" ? AddTaskScreen : AddCategoryScreen
        }
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/mind.png")}
              resizeMode="contain"
              style={{ width: 30, height: 30, tintColor: "#FFF" }}
            />
          ),
          tabBarButton: (props) => (
            <TabBarCustomButton
              children={props.children}
              onPress={props.onPress}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../assets/calendar.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#FFFFFF" : "#A2A2A2",
                }}
              />
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
              <Image
                source={require("../assets/settings.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#FFFFFF" : "#A2A2A2",
                }}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabButtonView: {
    width: 50,
    height: 50,
    borderRadius: 35,
    backgroundColor: "#FC69D3",
  },
  tabButtonOutter: {
    top: -15,
    backgroundColor: "#fff",
    borderRadius: 35,
    width: 55,
    height: 55,
    justifyContent: "center",
    alignContent: "center",
  },
});
