import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Navigation from "./src/navigations/Navigations";

export default function App() {
  return (
    <View className="flex-1">
      <StatusBar style="dark" backgroundColor="white" />
      <Navigation />
    </View>
  );
}
