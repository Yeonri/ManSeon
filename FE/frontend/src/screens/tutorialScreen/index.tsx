import { Image, ScrollView, View } from "react-native";

export function TutorialScreen() {
  return (
    <ScrollView>
      <View className="flex-1">
        <Image
          source={require("../../assets/images/tutorial/tutorial_intro.png")}
          className="w-[412px] h-[478px]"
        />
        <Image
          source={require("../../assets/images/tutorial/tutorial_record1.png")}
          className="w-[412px] h-[521px]"
        />
        <Image
          source={require("../../assets/images/tutorial/tutorial_record2.png")}
          className="w-[412px] h-[586px]"
        />
        <Image
          source={require("../../assets/images/tutorial/tutorial_collection1.png")}
          className="w-[412px] h-[379px]"
        />
        <Image
          source={require("../../assets/images/tutorial/tutorial_collection2.png")}
          className="w-[412px] h-[404px]"
        />
        <Image
          source={require("../../assets/images/tutorial/tutorial_map1.png")}
          className="w-[412px] h-[559px]"
        />
        <Image
          source={require("../../assets/images/tutorial/tutorial_map2.png")}
          className="w-[412px] h-[453px]"
        />
        <Image
          source={require("../../assets/images/tutorial/tutorial_community.png")}
          className="w-[412px] h-[528px]"
        />
      </View>
    </ScrollView>
  );
}
