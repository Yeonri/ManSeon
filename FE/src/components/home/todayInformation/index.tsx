import { Image, Text, View } from "react-native";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import moonList from "../../../data/moonList";
import BarChart from "../barChart";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function TodayInformation() {
  const nowKST = dayjs().tz("Asia/Seoul");
  const day = nowKST.date();
  const month = nowKST.month() + 1;
  const moon = moonList.find((item) => item.day === day);

  // 임시 데이터
  const data = {
    lunarDate: "2025-06-02", // 음력
    east: 13, // 동해/ 남해
    west: 12, // 서해
  };

  // 음력 날짜 변환
  function formatLunarDate(date: string): string {
    const [_LunarYear, LunarMonth, LunarDay] = date.split("-");
    return `${LunarMonth}.${LunarDay}`;
  }

  return (
    <View className="flex-row justify-between items-center">
      {/* 날짜 정보 */}
      <View>
        <View className="flex-row gap-2">
          <Text className="text-neutral-600 text-sm">오늘의 물때</Text>
          <Image source={moon!.img} className="self-center h-5 w-5" />
        </View>
        <View className="flex-row items-center gap-2">
          {/* 양력 날짜 */}
          <Text className="text-neutral-800 font-bold text-2xl">
            {month < 10 ? `0${month}` : month}.{day < 10 ? `0${day}` : day}
          </Text>

          {/* 음력 날짜*/}
          <Text className="text-neutral-600 font-semibold">{`(음력 ${formatLunarDate(data.lunarDate)})`}</Text>
        </View>
      </View>

      {/* 물때 정보 */}
      <View className="gap-2">
        {/* 동해 / 남해 */}
        <BarChart west={false} number={data.east} />

        {/* 서해 */}
        <BarChart west={true} number={data.west} />
      </View>
    </View>
  );
}
