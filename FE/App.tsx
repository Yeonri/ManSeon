import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "./global.css";
import { AppNavigator } from "./src/navigation/appNavigator";
import { AuthStackNavigator } from "./src/navigation/authStackNavigator";
import { useLoginStore } from "./src/store/loginStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { tokenStorage } from "./src/utils/tokenStorage";

const queryClient = new QueryClient();

export default function App(): React.JSX.Element {
  const mainTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "white",
    },
  };

  const [loggedIn, setLoggedIn] = useState(useLoginStore.getState().isLoggedIn);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = useLoginStore.subscribe(
      (state) => state.isLoggedIn,
      (value) => setLoggedIn(value)
    );
    return unsubscribe;
  }, []);

  useEffect(() => {
    async function tryAutoLogin() {
      const accessToken = await tokenStorage.getAccessToken();
      const refreshToken = await tokenStorage.getRefreshToken();

      if (accessToken && refreshToken) {
        useLoginStore.getState().setLogin({ accessToken, refreshToken });
      }
      setIsLoading(false);
    }
    tryAutoLogin();
  }, []);

  // if (isLoading) return null;

  return (
    <GestureHandlerRootView className="flex-1">
      <QueryClientProvider client={queryClient}>
        <NavigationContainer theme={mainTheme}>
          {loggedIn ? <AppNavigator /> : <AuthStackNavigator />}
        </NavigationContainer>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
