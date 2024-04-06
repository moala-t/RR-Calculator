import React, { useEffect } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen
        name="Home"
        options={{ title: "R/R Calculator" }}
        component={Home}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
