import { Text, View } from "react-native";

export default function RankItem({
  rank,
  name,
  count,
  highlight,
}: {
  rank: number;
  name: string;
  count: number;
  highlight?: boolean;
}) {
  const rankText = `${rank}위`;
  return (
    <View className="flex-row items-center gap-2">
      {/* 순위 */}
      <View
        className={`px-3 py-0.5 rounded-full border border-blue-500 ${
          highlight ? "bg-blue-500" : ""
        }`}
      >
        <Text
          className={`text-sm font-bold text-center ${
            highlight ? "text-white" : "text-blue-500"
          }`}
        >
          {rankText}
        </Text>
      </View>

      <View className="flex-row items-center gap-1">
        {/* 물고기 이름*/}
        <Text
          className={`font-bold ${
            highlight ? "text-blue-500" : "text-neutral-600"
          }`}
        >
          {name}
        </Text>

        {/* 물고기 수 */}
        <Text
          className={`text-sm self-center translate-y-[0.5] ${
            highlight ? "text-blue-500" : "text-neutral-400"
          }`}
        >
          {count}마리
        </Text>
      </View>
    </View>
  );
}
