import { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderBeforeTitle } from "../../components/common/headerBeforeTitle";
import { ToggleButton } from "../../components/common/toggleButton";
// import followerMock from "../../mocks/followerMocks.json";
// import followingMock from "../../mocks/followingMocks.json";

export function FriendsScreen() {
  const [selected, setSelected] = useState("팔로잉");
  // const selectList = selected === "팔로잉" ? followingMock : followerMock;

  return (
    <SafeAreaView>
      <HeaderBeforeTitle name="친구목록" />
      <View>
        <ToggleButton
          option1="팔로잉"
          option2="팔로워"
          selected={selected}
          onSelect={setSelected}
        />
        <Text> 친구 목록 </Text>
        <View />
      </View>
    </SafeAreaView>
  );
}
