import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SplashScreen from "react-native-splash-screen";
import "./global.css";
import tokenStorage from "./src/utils/tokenStorage";
import { RootNavigator } from "./src/navigation/rootNavigator";

const queryClient = new QueryClient();

export default function App(): React.JSX.Element {
  const mainTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#FFFFFF",
    },
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function tryAutoLogin() {
      setIsLoading(false);
      SplashScreen.hide();
    }
    tryAutoLogin();
  }, []);

  return (
    <GestureHandlerRootView className="flex-1">
      <QueryClientProvider client={queryClient}>
        <NavigationContainer theme={mainTheme}>
          <RootNavigator />
        </NavigationContainer>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
