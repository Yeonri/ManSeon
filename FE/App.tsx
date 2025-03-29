import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import React from "react";
import "./global.css";
import { AppNavigator } from "./src/navigation/appNavigator";

export default function App(): React.JSX.Element {
  const mainTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "white",
    },
  };
  return (
    <NavigationContainer theme={mainTheme}>
      <AppNavigator />
    </NavigationContainer>
  );
}
