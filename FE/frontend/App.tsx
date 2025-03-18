import React from "react";
import { Text, View } from "react-native";
import "./global.css";
import Home from "./src/assets/images/icon_home.svg";

export default function App(): React.JSX.Element {
  return (
    <View>
      <Text className="bg-blue-500">만선</Text>
      <Home />
    </View>
  );
}
