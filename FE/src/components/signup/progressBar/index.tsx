import { Text, View } from "react-native";

function ProgressBar({ number }: { number: number }) {
  return (
    <View className="flex-row items-center gap-2">
      <View
        className={`justify-center items-center rounded-full ${number === 1 ? "w-12 h-12 bg-blue-500" : "w-10 h-10 bg-neutral-100"}`}
      >
        <Text
          className={`font-bold text-lg ${number === 1 ? "text-white" : "text-neutral-300"}`}
        >
          1
        </Text>
      </View>
      <View
        className={`w-10 h-10 justify-center items-center rounded-full ${number === 2 ? "w-12 h-12 bg-blue-500" : "w-10 h-10 bg-neutral-100"}`}
      >
        <Text
          className={`font-bold text-lg ${number === 2 ? "text-white" : "text-neutral-300"}`}
        >
          2
        </Text>
      </View>
      <View
        className={`w-10 h-10 justify-center items-center rounded-full ${number === 3 ? "w-12 h-12 bg-blue-500" : "w-10 h-10 bg-neutral-100"}`}
      >
        <Text
          className={`font-bold text-lg ${number === 3 ? "text-white" : "text-neutral-300"}`}
        >
          3
        </Text>
      </View>
      <View
        className={`w-10 h-10 justify-center items-center rounded-full ${number === 4 ? "w-12 h-12 bg-blue-500" : "w-10 h-10 bg-neutral-100"}`}
      >
        <Text
          className={`font-bold text-lg ${number === 4 ? "text-white" : "text-neutral-300"}`}
        >
          4
        </Text>
      </View>
    </View>
  );
}

export default ProgressBar;
