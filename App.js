import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import { Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from "@expo-google-fonts/poppins";
import { useFonts } from "expo-font";

import { NavigationContainer } from "@react-navigation/native";

import { Tabs } from "./navigation/Tabs";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": Poppins_400Regular,
    "Poppins-Bold": Poppins_700Bold,
    "Poppins-SemiBold": Poppins_600SemiBold,
    "Poppins-Medium": Poppins_500Medium,
  });
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  return (
    <>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </>
  );
}
