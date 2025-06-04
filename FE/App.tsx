import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SplashScreen from "react-native-splash-screen";
import "./global.css";
import { UserInitializer } from "./src/components/common/userInitializer";
import { AppNavigator } from "./src/navigation/appNavigator";
import { AuthStackNavigator } from "./src/navigation/authStackNavigator";
import { useLoginStore } from "./src/store/loginStore";
import tokenStorage from "./src/utils/tokenStorage";

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
      await tokenStorage.clear();
      const accessToken = await tokenStorage.getAccessToken();
      const refreshToken = await tokenStorage.getRefreshToken();

      if (accessToken && refreshToken) {
        useLoginStore.getState().setLogin({ accessToken, refreshToken });
      }
      setIsLoading(false);
      SplashScreen.hide();
    }
    tryAutoLogin();
  }, []);

  let content = null;

  if (!isLoading) {
    content = loggedIn ? (
      <UserInitializer>
        <AppNavigator />
      </UserInitializer>
    ) : (
      <AuthStackNavigator />
    );
  }

  return (
    <GestureHandlerRootView className="flex-1">
      <QueryClientProvider client={queryClient}>
        <NavigationContainer theme={mainTheme}>{content}</NavigationContainer>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
