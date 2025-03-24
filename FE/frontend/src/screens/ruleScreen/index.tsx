import {
  Image,
  ImageSourcePropType,
  ScrollView,
  Text,
  View,
} from "react-native";

type Rule = {
  id: number;
  name: string;
  length: string;
  info?: string;
  img: ImageSourcePropType;
};

const RuleList: Rule[] = [
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
    img: require("../../assets/images/rule/돌돔돔.png"),
  },
  {
    id: 5,
    name: "돌돔",
    length: "24cm 이하",
    img: require("../../assets/images/rule/돌돔돔.png"),
  },
];

export function RuleScreen() {
  return (
    <ScrollView className="bg-white">
      <View className="bg-white flex-1">
        {RuleList.map((item) => (
          <View key={item.id}>
            <Image source={item.img} className="w-[100px] h-[100px]" />
            <Text>{item.name}</Text>
            {item.info ? (
              <Text>
                {" "}
                길이: {item.length} {"\n"}
                {item.info}
              </Text>
            ) : (
              <Text>길이: {item.length}</Text>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
