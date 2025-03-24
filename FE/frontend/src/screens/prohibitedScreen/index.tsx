import { Image, ImageSourcePropType, Text, View } from "react-native";

type Prohibited = {
  id: number;
  name: string;
  start: number;
  end: number;
  period: string;
  info?: string;
  img: ImageSourcePropType;
};

const prohibitedList: Prohibited[] = [
  {
    id: 1,
    name: "대구",
    start: 1,
    end: 2,
    period: "01.16 ~ 02.15",
    img: require("../../assets/images/prohibited/대구.png"),
  },
  {
    id: 2,
    name: "문치가자미",
    start: 12,
    end: 1,
    period: "12.01 ~ 01.31",
    img: require("../../assets/images/prohibited/문치가자미.png"),
  },
  {
    id: 3,
    name: "연어",
    start: 10,
    end: 11,
    period: "10.01 ~ 11.30",
    img: require("../../assets/images/prohibited/연어.png"),
  },
  {
    id: 4,
    name: "전어",
    start: 5,
    end: 7,
    period: "05.01 ~ 07.15",
    img: require("../../assets/images/prohibited/전어.png"),
    info: "강원특별자치도 및 경상북도 제외",
  },
  {
    id: 5,
    name: "쥐노래미",
    start: 11,
    end: 12,
    period: "11.01 ~ 12.30",
    img: require("../../assets/images/prohibited/쥐노래미.png"),
  },
  {
    id: 6,
    name: "참홍어",
    start: 6,
    end: 7,
    period: "06.01 ~ 07.15",
    img: require("../../assets/images/prohibited/참홍어.png"),
  },
  {
    id: 7,
    name: "참조기",
    start: 7,
    end: 7,
    period: "07.01 ~ 07.31",
    img: require("../../assets/images/prohibited/참조기.png"),
    info: "근해자망어업 중 유자망(유동성그물)을 사용하는 경우 4월 22일부터 8월 10일까지. 해당 기간 중 참조기를 어획량의 10% 미만으로  포획·채취하는 경우 제외",
  },
  {
    id: 8,
    name: "갈치",
    start: 7,
    end: 7,
    period: "07.01 ~ 07.31",
    img: require("../../assets/images/prohibited/갈치.png"),
    info: "북위 33도00분00초 이북 해역 한정. 근해채낚기어업 및 연안 복합어업 제외. 해당 구역에서 해당 기간 중 갈치를 어획량의  10% 미만으로  포획·채취하는 경우 제외",
  },
  {
    id: 9,
    name: "고등어",
    start: 4,
    end: 6,
    period: "04.01 ~ 06.30",
    img: require("../../assets/images/prohibited/고등어.png"),
    info: "기간 중 1개월의 범위 내에서 해양수산부장관이 정하여 고시하는 기간. 해당 기간 중 고등어를  10% 미만으로  포획·채취하는 경우 제외",
  },
  {
    id: 10,
    name: "말쥐치",
    start: 5,
    end: 7,
    period: "05.01 ~ 07.31",
    img: require("../../assets/images/prohibited/말쥐치.png"),
    info: "정치망어업, 연안어업 및 구획어업은 6월 1일부터 7월 31일까지",
  },
  {
    id: 11,
    name: "옥돔",
    start: 7,
    end: 8,
    period: "07.21 ~ 08.20",
    img: require("../../assets/images/prohibited/옥돔.png"),
  },
  {
    id: 12,
    name: "명태",
    start: 1,
    end: 12,
    period: "01.01 ~ 12.31",
    img: require("../../assets/images/prohibited/명태.png"),
  },
  {
    id: 13,
    name: "삼치",
    start: 5,
    end: 5,
    period: "05.01 ~ 5.31",
    img: require("../../assets/images/prohibited/삼치.png"),
  },
  {
    id: 14,
    name: "감성돔",
    start: 5,
    end: 5,
    period: "05.01 ~ 5.31",
    img: require("../../assets/images/prohibited/감성돔.png"),
  },
];

export function ProhibitedScreen() {
  const date = new Date();
  const month = date.getMonth() + 1;

  const monthProhibitedList: Prohibited[] = prohibitedList.filter((fish) => {
    if (fish.start <= fish.end) {
      return month >= fish.start && month <= fish.end;
    } else {
      return month >= fish.start || month <= fish.end;
    }
  });

  return (
    <View className="bg-white flex-1">
      {/* 월 정보 */}
      <View className="self-center bg-blue-500 rounded-full w-60 h-10 mt-4 mb-6 items-center justify-center">
        <Text className="text-white font-bold text-base"> {month}월</Text>
      </View>

      {/* 해당 월에 속하는 물고기 정보 */}
      {monthProhibitedList.map((item) => (
        <View
          key={item.id}
          className="flex-row items-center p-4 shadow-sm shadow-blue-300 mb-4"
        >
          <Image
            source={item.img}
            className="w-[100px] h-[100px] mr-4"
            resizeMode="contain"
          />
          <View className="flex-1">
            <Text className="text-lg font-bold mb-1">{item.name}</Text>
            {item.info ? (
              <Text className="text-gray-600 leading-relaxed text-[14px]">
                기간 : {item.period}
                {"\n"}
                {item.info}
              </Text>
            ) : (
              <Text className="text-gray-600 mb-1">기간 : {item.period}</Text>
            )}
          </View>
        </View>
      ))}
    </View>
  );
}
