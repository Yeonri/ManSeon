import { ScrollView, Text, View } from "react-native";

interface tideInfo {
  date: string;
  high_tide: [];
  low_tide: [];
}

interface Props {
  data: tideInfo[];
}

export function WeatherTable({ data }: Props) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View className="gap-y-1 bg-blue-50">
        <View className="flex-row items-center bg-blue-100 py-1 px-2">
          <Text className="w-16 font-medium text-center">시각</Text>
          {data.map((item, idx) => (
            <Text key={idx} className="w-16 text-center text-base font-bold">
              {item.high_tide}
            </Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
