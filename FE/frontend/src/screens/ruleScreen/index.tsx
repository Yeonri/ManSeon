import { useState } from "react";
import {
  Image,
  ImageSourcePropType,
  ScrollView,
  Text,
  View,
} from "react-native";
import { ToggleButton } from "../../components/common/toggleButton";

type Rule = {
  id: number;
  name: string;
  length: string;
  info?: string;
  img: ImageSourcePropType;
};

const RuleSeaList: Rule[] = [
  {
    id: 1,
    name: "문치가자미",
    length: "20cm 이하",
    img: require("../../assets/images/rule/문치가자미.png"),
  },
  {
    id: 2,
    name: "참가자미",
    length: "20cm 이하",
    img: require("../../assets/images/rule/참가자미.png"),
  },
  {
    id: 3,
    name: "감성돔",
    length: "25cm 이하",
    img: require("../../assets/images/rule/감성돔.png"),
  },
  {
    id: 4,
    name: "돌돔",
    length: "24cm 이하",
    img: require("../../assets/images/rule/돌돔.png"),
  },
  {
    id: 5,
    name: "참돔",
    length: "24cm 이하",
    img: require("../../assets/images/rule/참돔.png"),
  },
  {
    id: 6,
    name: "넙치",
    length: "35cm 이하",
    img: require("../../assets/images/rule/넙치.png"),
  },
  {
    id: 7,
    name: "농어",
    length: "30cm 이하",
    img: require("../../assets/images/rule/농어.png"),
  },
  {
    id: 8,
    name: "대구",
    length: "35cm 이하",
    img: require("../../assets/images/rule/대구.png"),
  },
  {
    id: 9,
    name: "도루묵",
    length: "11cm 이하",
    img: require("../../assets/images/rule/도루묵.png"),
  },
  {
    id: 10,
    name: "민어",
    length: "33cm 이하",
    img: require("../../assets/images/rule/민어.png"),
  },
  {
    id: 11,
    name: "방어",
    length: "30cm 이하",
    img: require("../../assets/images/rule/방어.png"),
  },
  {
    id: 12,
    name: "볼락",
    length: "15cm 이하",
    img: require("../../assets/images/rule/볼락.png"),
  },
  {
    id: 13,
    name: "붕장어",
    length: "35cm 이하",
    img: require("../../assets/images/rule/붕장어.png"),
  },
  {
    id: 14,
    name: "조피볼락",
    length: "23cm 이하",
    img: require("../../assets/images/rule/조피볼락.png"),
  },
  {
    id: 15,
    name: "쥐노래미",
    length: "20cm 이하",
    img: require("../../assets/images/rule/쥐노래미.png"),
  },
  {
    id: 16,
    name: "참홍어",
    length: "42cm 이하",
    img: require("../../assets/images/rule/참홍어.png"),
    info: "체반폭 기준 양쪽 가슴지느러미 사이의 너비",
  },
  {
    id: 17,
    name: "갈치",
    length: "18cm 이하",
    img: require("../../assets/images/rule/갈치.png"),
    info: "항문장 기준 주둥이에서 항문까지의 길이. 갈치 어획량 중 해당 체장의 갈치를 20% 미만으로 포획·채취하는 경우 제외",
  },
  {
    id: 18,
    name: "고등어",
    length: "21cm 이하",
    img: require("../../assets/images/rule/고등어.png"),
    info: "고등어 어획량 중 해당 체장의 고등어를 20% 미만으로 포획·채취하는 경우 제외",
  },
  {
    id: 19,
    name: "참조기",
    length: "15cm 이하",
    img: require("../../assets/images/rule/참조기.png"),
    info: "참조기 어획량 중 해당 체장의 참조기를 20% 미만으로 포획·채취하는 경우 제외",
  },
  {
    id: 20,
    name: "말쥐치",
    length: "18cm 이하",
    img: require("../../assets/images/rule/말쥐치.png"),
  },
  {
    id: 21,
    name: "갯장어",
    length: "40cm 이하",
    img: require("../../assets/images/rule/갯장어.png"),
  },
  {
    id: 22,
    name: "미거지",
    length: "40cm 이하",
    img: require("../../assets/images/rule/미거지.png"),
  },
  {
    id: 23,
    name: "용가자미",
    length: "20cm 이하",
    img: require("../../assets/images/rule/용가자미.png"),
  },
  {
    id: 24,
    name: "기름가자미",
    length: "20cm 이하",
    img: require("../../assets/images/rule/기름가자미.png"),
  },
  {
    id: 25,
    name: "청어",
    length: "20cm 이하",
    img: require("../../assets/images/rule/청어.png"),
  },
];

const RuleFreashwaterList: Rule[] = [
  {
    id: 1,
    name: "산천어",
    length: "20cm 이하",
    img: require("../../assets/images/rule/산천어.png"),
  },
  {
    id: 2,
    name: "송어",
    length: "12cm 이하",
    img: require("../../assets/images/rule/송어.png"),
  },
  {
    id: 3,
    name: "쏘가리",
    length: "18cm 이하",
    img: require("../../assets/images/rule/쏘가리.png"),
  },
  {
    id: 4,
    name: "황복",
    length: "20cm 이하",
    img: require("../../assets/images/rule/황복.png"),
  },
  {
    id: 5,
    name: "뱀장어",
    length: "15cm 이상 ~ 45cm 이하",
    img: require("../../assets/images/rule/뱀장어.png"),
  },
];

export function RuleScreen() {
  const [selected, setSelected] = useState("바다");
  const selectList = selected === "바다" ? RuleSeaList : RuleFreashwaterList;

  return (
    <ScrollView className="bg-white">
      <View className="bg-white flex-1 px-4 pt-4">
        <ToggleButton
          option1="바다"
          option2="민물"
          selected={selected}
          onSelect={setSelected}
        />

        <View className="mt-6">
          {selectList.map((item) => (
            <View key={item.id} className="flex-row items-center p-4">
              <Image
                source={item.img}
                className="w-[100px] h-[100px] mr-4"
                resizeMode="contain"
              />
              <View className="flex-1">
                <Text className="text-lg font-bold mb-1">{item.name}</Text>
                <Text className="text-neutral-600 leading-relaxed text-[14px]">
                  길이: {item.length}
                  {item.info ? `\n${item.info}` : ""}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
