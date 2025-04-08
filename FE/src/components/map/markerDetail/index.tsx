import { Bookmark, X } from "lucide-react-native";
import { forwardRef, Ref } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { TideChart } from "../tideChart";
import { WeatherTable } from "../weatherTable";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

interface MarkerDetailProps {
  point: any | null;
}

dayjs.extend(utc);
dayjs.extend(timezone);

export const MarkerDetail = forwardRef<Modalize, MarkerDetailProps>(
  ({ point }, ref: Ref<Modalize>) => {
    if (!point) return null;

    const dayMap = ["일", "월", "화", "수", "목", "금", "토"];

    const nowKST = dayjs().tz("Asia/Seoul");
    const day = nowKST.date();
    const koreanDay = dayMap[nowKST.day()];
    const month = nowKST.month() + 1;

    return (
      <Modalize ref={ref} snapPoint={400} modalHeight={600}>
        <ScrollView className="p-4">
          {/* 포인트명 및 북마크 */}
          <View className="flex-row justify-between mb-2">
            <View className="flex-row gap-2 items-center">
              <Bookmark />
              <Text className="text-xl font-bold text-neutral-800">
                {point.pointName}
              </Text>
            </View>
            <TouchableOpacity
              className="mx-2"
              onPress={() =>
                (ref as React.RefObject<Modalize>)?.current?.close()
              }
            >
              <X />
            </TouchableOpacity>
          </View>

          {/* 수심 및 저질 */}
          <View className="flex-row gap-3 ml-9">
            <Text className="mb-3">수심: {point.water_depth}m</Text>
            <Text>저질: {point.seabed_type}</Text>
          </View>

          {/* 구분선 */}
          <View className="w-[90%] h-px bg-neutral-100 self-center my-2" />

          {/* 시간별 예보 */}
          <View className="flex-row gap-2 items-baseline">
            <Text className="text-neutral-800 font-semibold text-xl">
              시간별 예보
            </Text>
            <Text className="text-neutral-600 font-medium text-base">
              {month}월 {day}일 ({koreanDay})
            </Text>
          </View>

          {/* 일출일몰 및 최고최저 기온*/}
          <View className="flex-row justify-between mt-1">
            <View className="flex-row gap-2">
              <Text className="text-base">일출</Text>
              {/* <Text className="font-medium text-base">{point.sunrise}</Text> */}
              <Text className="font-medium text-base">
                {point.sunrise ?? "-"}
              </Text>
              <Text className="text-base">일몰</Text>
              {/* <Text className="font-medium text-base">{point.sunset}</Text> */}
              <Text className="font-medium text-base">
                {point.sunset ?? "-"}
              </Text>
            </View>

            <View className="flex-row gap-1">
              <View className="flex-row gap-1">
                <Text>최저</Text>
                <TouchableOpacity className="border border-blue-500 px-2 rounded-2xl">
                  {/* <Text className="text-blue-500 font-medium">
                    {point.temperature_min}°C
                  </Text> */}
                  <Text className="text-blue-500 font-medium">
                    {point.temperature_min ?? "-"}°C
                  </Text>
                </TouchableOpacity>
              </View>
              <View className="flex-row gap-1">
                <Text>최고</Text>
                <TouchableOpacity className="border border-blue-500 bg-blue-500 px-2 rounded-2xl">
                  {/* <Text className="text-white font-medium">
                    {point.temperature_max}°C
                  </Text> */}
                  <Text className="text-white font-medium">
                    {point.temperature_max ?? "-"}°C
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* 표 */}
          <View className="mt-3">
            <WeatherTable data={point.weather_forecast} />
          </View>

          {/* 물때 그래프*/}
          <View className="mt-3">
            <Text className="text-neutral-800 font-semibold text-xl mb-3">
              물때 정보
            </Text>
            <TideChart data={point.tide_info} />
          </View>

          {/* 해당 포인트에서 내가 잡은 물고기 정보 */}
          {/* <View className="mt-3">
            <Text className="text-neutral-800 font-semibold text-xl mb-3">
              이 근처에서 잡힌 물고기
            </Text>
            <View className="bg-blue-50 p-3">
              <FishingFishList data={point.my_caught_fish} />
            </View>
          </View> */}

          {/* 해당 포인트 전체에서 잡은 물고기 정보 */}
          {/* <View className="mt-3">
            <Text className="text-neutral-800 font-semibold text-xl mb-3">
              이 포인트에서 내가 잡은 물고기
            </Text>
            <View className="bg-blue-50 p-3">
              <FishingFishList data={point.caught_fish_summary} />
            </View>
          </View> */}
        </ScrollView>
      </Modalize>
    );
  }
);
