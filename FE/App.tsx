import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import React from "react";
import "./global.css";
import { AppNavigator } from "./src/navigation/appNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App(): React.JSX.Element {
  const mainTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "white",
    },
  };
  return (
    <GestureHandlerRootView className="flex-1">
      <NavigationContainer theme={mainTheme}>
        <AppNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
