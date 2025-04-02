import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "./global.css";
import { AppNavigator } from "./src/navigation/appNavigator";
import { AuthStackNavigator } from "./src/navigation/authStackNavigator";
import { useLoginStore } from "./src/store/loginStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App(): React.JSX.Element {
  const mainTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "white",
    },
  };
  const { isLoggedIn } = useLoginStore();

  return (
    <GestureHandlerRootView className="flex-1">
      <QueryClientProvider client={queryClient}>
        <NavigationContainer theme={mainTheme}>
          {isLoggedIn ? <AppNavigator /> : <AuthStackNavigator />}
        </NavigationContainer>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
