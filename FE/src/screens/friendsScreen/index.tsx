import { useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useMyFollowerList,
  useMyFollowingList,
} from "../../api/quries/useFollow";
import { HeaderBeforeTitle } from "../../components/common/headerBeforeTitle";
import { ToggleButton } from "../../components/common/toggleButton";

export function FriendsScreen() {
  const [selected, setSelected] = useState("팔로잉");

  const { data: followingList = [] } = useMyFollowingList();
  const { data: followerList = [] } = useMyFollowerList();

  const currentList = selected === "팔로잉" ? followingList : followerList;

  return (
    <SafeAreaView className="flex-1 px-5">
      <HeaderBeforeTitle name="친구목록" />
      <View className="pt-5">
        <ToggleButton
          option1="팔로잉"
          option2="팔로워"
          selected={selected}
          onSelect={setSelected}
        />
      </View>

      <FlatList
        data={currentList}
        keyExtractor={(item) => item.userId.toString()}
        contentContainerStyle={{ marginTop: 16 }}
        renderItem={({ item }) => (
          <View className="flex-row items-center gap-x-3 mb-4">
            <Image
              source={{ uri: item.profile_img }}
              className="w-10 h-10 rounded-full bg-neutral-200"
            />
            <Text className="text-base font-medium">{item.nickname}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text className="text-center text-neutral-400 mt-10">
            {selected} 목록이 비어있습니다.
          </Text>
        }
      />
    </SafeAreaView>
  );
}
