import { Text, View } from "react-native";
import { PieChart as RawPieChart } from "react-native-chart-kit";
import RankItem from "../rankItem";
const PieChart = RawPieChart as any;

interface FishItem {
  name: string;
  count: number;
}

interface FishingDonutChartProps {
  fishingList: FishItem[] | undefined;
  totalCount: number;
}

const colors = ["#284AAA", "#3A83EE", "#7AB3F1", "#C2DFFB", "#ECF3FE"];

export default function FishingDonutChart({
  fishingList,
  totalCount,
}: FishingDonutChartProps) {
  if (!fishingList || fishingList.length === 0) {
    return <Text>데이터가 없습니다.</Text>;
  }

  const sortedList = [...fishingList].sort((a, b) => b.count - a.count);

  const top4 = sortedList.slice(0, 5);

  const others = sortedList.slice(4);
  const othersTotal = others.reduce((sum, item) => sum + item.count, 0);

  const data = [
    ...top4.map((fish, index) => ({
      name: fish.name,
      population: fish.count,
      color: colors[index % colors.length],
    })),
  ];

  if (othersTotal > 0) {
    data.push({
      name: "기타",
      population: othersTotal,
      color: colors[4],
    });
  }

  return (
    <View className="mx-3 flex-row items-center gap-5">
      {/* 도넛 차트 */}
      <View className="items-center justify-center">
        <PieChart
          data={data}
          width={120}
          height={120}
          chartConfig={{
            color: () => `rgba(0, 0, 0, 0)`,
          }}
          accessor={"population"}
          backgroundColor={"transparent"}
          paddingLeft={"30"}
          hasLegend={false}
        />
        <View className="absolute items-center justify-center bg-white h-16 w-16 rounded-full flex-row">
          <Text className="text-neutral-800 text-lg font-bold">
            {totalCount}
          </Text>
          <Text className="text-sm text-neutral-600">마리</Text>
        </View>
      </View>

      {/* 순위 */}
      <View className="gap-2">
        {top4.slice(0, 3).map((item, index) => (
          <RankItem
            key={index}
            rank={index + 1}
            name={item.name}
            count={item.count}
            highlight={index === 0}
          />
        ))}
      </View>
    </View>
  );
}
