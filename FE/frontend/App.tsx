import React from "react";
import "./global.css";
import { NavigationContainer } from "@react-navigation/native";
import { BottomTabNavigator } from "./src/navigation/bottomTabNavigator";

export default function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
}
