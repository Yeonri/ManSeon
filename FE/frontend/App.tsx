import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import "./global.css";
import { BottomTabNavigator } from "./src/navigation/bottomTabNavigator";

export default function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
}
