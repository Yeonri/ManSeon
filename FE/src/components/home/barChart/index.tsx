import { Text, View } from "react-native";

export default function BarChart({
  west,
  number,
}: {
  west: boolean;
  number: number;
}) {
  const percentage = Math.min((number / 15) * 100, 100);
  const minPercentage = Math.max(percentage, 0);

  const westLabels = [
    "1물",
    "2물",
    "3물",
    "4물",
    "5물",
    "사리",
    "7물",
    "8물",
    "9물",
    "10물",
    "11물",
    "12물",
    "13물",
    "조금",
    "무시",
  ];

  const eastSouthLabels = [
    "1물",
    "2물",
    "3물",
    "4물",
    "5물",
    "6물",
    "사리",
    "8물",
    "9물",
    "10물",
    "11물",
    "12물",
    "13물",
    "14물",
    "조금",
  ];

  const label =
    number >= 1 && number <= 15
      ? west
        ? westLabels[number - 1]
        : eastSouthLabels[number - 1]
      : "";

  return (
    <View className="flex-row items-center">
      <Text className="text-neutral-600 text-xs w-[50px] text-right">
        {west ? `서해` : `동해 / 남해`}
      </Text>

      <Text className="text-blue-500 text-xs font-bold w-[30px] text-center">
        {label}
      </Text>

      <View className="w-20 h-4 bg-neutral-100 rounded-full overflow-hidden">
        <View
          style={{
            width: `${minPercentage}%`,
            height: "100%",
            backgroundColor: "#3B82F6",
            borderRadius: 100,
          }}
        />
      </View>
    </View>
  );
}
