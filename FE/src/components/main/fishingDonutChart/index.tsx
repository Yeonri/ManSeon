import React from "react";
import { Text, View } from "react-native";
import { PieChart as RawPieChart } from "react-native-chart-kit";
const PieChart = RawPieChart as any;

interface FishItem {
  id: number;
  name: string;
  cnt: number;
}

interface FishingDonutChartProps {
  fishingList: FishItem[];
  totalCount: number;
}

const COLORS = ["#284AAA", "#3A83EE", "#7AB3F1", "#C2DFFB", "#ECF3FE"];

export function FishingDonutChart({
  fishingList,
  totalCount,
}: FishingDonutChartProps) {
  const sortedList = [...fishingList].sort((a, b) => b.cnt - a.cnt);

  const top4 = sortedList.slice(0, 5);

  const others = sortedList.slice(4);
  const othersTotal = others.reduce((sum, item) => sum + item.cnt, 0);

  const data = [
    ...top4.map((fish, index) => ({
      name: fish.name,
      population: fish.cnt,
      color: COLORS[index % COLORS.length],
    })),
  ];

  if (othersTotal > 0) {
    data.push({
      name: "기타",
      population: othersTotal,
      color: COLORS[4],
    });
  }

  return (
    <View className="items-center justify-center">
      <PieChart
        data={data}
        width={150}
        height={150}
        chartConfig={{
          color: () => `rgba(0, 0, 0, 0)`,
        }}
        accessor={"population"}
        backgroundColor={"transparent"}
        paddingLeft={"30"}
        hasLegend={false}
      />
      <View className="absolute items-center -ml-4 justify-center bg-white h-20 w-20 rounded-full flex-row gap-0.5">
        <Text className="text-2xl font-bold text-gray-800">{totalCount}</Text>
        <Text className="text-base text-gray-500">마리</Text>
      </View>
    </View>
  );
}
