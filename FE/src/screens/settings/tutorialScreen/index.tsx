import { Image, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderBeforeTitle } from "../../../components/common/headerBeforeTitle";

export function TutorialScreen() {
  return (
    <SafeAreaView>
      <HeaderBeforeTitle name="튜토리얼" />
      <ScrollView>
        <View className="flex-1">
          <Image
            source={require("../../../assets/images/tutorial/tutorial_intro.png")}
            className="w-[412px] h-[478px]"
          />
          <Image
            source={require("../../../assets/images/tutorial/tutorial_record1.png")}
            className="w-[412px] h-[521px]"
          />
          <Image
            source={require("../../../assets/images/tutorial/tutorial_record2.png")}
            className="w-[412px] h-[586px]"
          />
          <Image
            source={require("../../../assets/images/tutorial/tutorial_collection1.png")}
            className="w-[412px] h-[379px]"
          />
          <Image
            source={require("../../../assets/images/tutorial/tutorial_collection2.png")}
            className="w-[412px] h-[404px]"
          />
          <Image
            source={require("../../../assets/images/tutorial/tutorial_map1.png")}
            className="w-[412px] h-[559px]"
          />
          <Image
            source={require("../../../assets/images/tutorial/tutorial_map2.png")}
            className="w-[412px] h-[453px]"
          />
          <Image
            source={require("../../../assets/images/tutorial/tutorial_community.png")}
            className="w-[412px] h-[528px]"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
