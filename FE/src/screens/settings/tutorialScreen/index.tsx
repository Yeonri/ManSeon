import { Image, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/common/header";

const { width: screenWidth } = Dimensions.get("window");

const tutorialImages = [
  {
    src: require("../../../assets/images/tutorial/tutorial_intro.png"),
    ratio: 412 / 478,
  },
  {
    src: require("../../../assets/images/tutorial/tutorial_record1.png"),
    ratio: 412 / 521,
  },
  {
    src: require("../../../assets/images/tutorial/tutorial_record2.png"),
    ratio: 412 / 586,
  },
  {
    src: require("../../../assets/images/tutorial/tutorial_collection1.png"),
    ratio: 412 / 379,
  },
  {
    src: require("../../../assets/images/tutorial/tutorial_collection2.png"),
    ratio: 412 / 404,
  },
  {
    src: require("../../../assets/images/tutorial/tutorial_map1.png"),
    ratio: 412 / 559,
  },
  {
    src: require("../../../assets/images/tutorial/tutorial_map2.png"),
    ratio: 412 / 453,
  },
  {
    src: require("../../../assets/images/tutorial/tutorial_community.png"),
    ratio: 412 / 528,
  },
];

export default function TutorialScreen() {
  return (
    <SafeAreaView>
      {/* 헤더 */}
      <Header logo={true} before={true} />

      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 32 }}>
        {tutorialImages.map((image, index) => (
          <Image
            key={index}
            source={image.src}
            style={{
              width: screenWidth,
              height: undefined,
              aspectRatio: image.ratio,
              resizeMode: "contain",
            }}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
