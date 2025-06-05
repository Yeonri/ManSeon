import { Image, ScrollView, Text, View } from "react-native";
import { weatherImageMap, windArrowImageMap } from "../../../utils/imageMaps";
import {
  getWeatherImageKey,
  getWindArrowImageKey,
} from "../../../utils/getImages";

interface WeatherForecast {
  date: string;
  sky: number;
  temperature: number;
  precipitation_prob: number;
  precipitation: number;
  humidity: number;
  wind_direction: string;
  wind_speed: number;
  wave_height: number | string;
  precipitation_type: number;
}

interface Props {
  data: WeatherForecast[];
}

export function WeatherTable({ data }: Props) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View className="gap-y-1 bg-blue-50">
        {/* 시각 */}
        <View className="flex-row items-center bg-blue-100 py-1 px-2">
          <Text className="w-16 font-medium text-center">시각</Text>
          {data.map((item, idx) => (
            <Text key={idx} className="w-16 text-center text-base font-bold">
              {new Date(item.date).getHours()}시
            </Text>
          ))}
        </View>

        {/* 날씨 */}
        <View className="flex-row items-center bg-blue-50 py-2 px-2">
          <Text className="w-16 font-medium text-center">날씨</Text>
          {data.map((item, idx) => (
            <View key={idx} className="w-16 items-center">
              <Image
                source={
                  weatherImageMap[
                    getWeatherImageKey(item.sky, item.precipitation_type)
                  ]
                }
                className="w-10 h-10"
              />
            </View>
          ))}
        </View>

        {/* 기온 */}
        <View className="flex-row items-center bg-blue-100 py-2 px-2">
          <Text className="w-16 font-medium text-base text-center">기온</Text>
          {data.map((item, idx) => (
            <Text key={idx} className="w-16 text-center text-red-500 font-bold">
              {item.temperature}°C
            </Text>
          ))}
        </View>

        {/* 강수량 */}
        <View className="flex-row items-center px-2 py-2">
          <Text className="w-16 font-medium text-center">강수량</Text>
          {data.map((item, idx) => (
            <Text key={idx} className="w-16 text-center">
              {item.precipitation}
            </Text>
          ))}
        </View>

        {/* 강수확률 */}
        <View className="flex-row items-center bg-blue-100 py-2 px-2">
          <Text className="w-16 font-medium text-center">강수확률</Text>
          {data.map((item, idx) => (
            <Text key={idx} className="w-16 text-center">
              {item.precipitation_prob}%
            </Text>
          ))}
        </View>

        {/* 풍향 */}
        <View className="flex-row items-center px-2 py-2">
          <Text className="w-16 font-medium text-center">풍향</Text>
          {data.map((item, idx) => (
            <View key={idx} className="w-16 items-center justify-center">
              <Image
                source={
                  windArrowImageMap[getWindArrowImageKey(item.wind_direction)]
                }
                className="w-3 h-3"
                resizeMode="contain"
              />
            </View>
          ))}
        </View>

        {/* 풍속 */}
        {/* <View className="flex-row items-center bg-blue-100 py-2 px-2">
          <Text className="w-16 font-medium text-center ">풍속</Text>
          {data.map((item, idx) => (
            <Text key={idx} className="w-16 text-center">
              {item.wind_speed}
            </Text>
          ))}
        </View> */}

        {/* 파고 */}
        {/* <View className="flex-row items-center px-2 py-2">
          <Text className="w-16 font-medium text-center">파고</Text>
          {data.map((item, idx) => (
            <Text key={idx} className="w-16 text-center">
              {item.wave_height}
            </Text>
          ))}
        </View> */}

        {/* 습도 */}
        {/* <View className="flex-row items-center px-2 py-2">
          <Text className="w-16 font-medium text-center">습도</Text>
          {data.map((item, idx) => (
            <Text key={idx} className="w-16 text-center">
              {item.humidity}
            </Text>
          ))}
        </View> */}
      </View>
    </ScrollView>
  );
}
