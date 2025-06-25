import { Text, View } from "react-native";

export function SelectTag({ name, fill }: { name: string; fill: boolean }) {
  return (
    <View
      className={`w-20 p-1 rounded-full border-2 border-blue-500 ${fill ? "bg-blue-500" : "bg-none"} `}
    >
      <Text
        className={`text-center text-sm ${fill ? "text-white" : "text-blue-500"}`}
      >
        {name}
      </Text>
    </View>
  );
}
