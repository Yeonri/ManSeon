import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/common/header";
import { useState } from "react";
import {
  useGetMyFollowers,
  useGetMyFollowings,
} from "../../../api/queries/follow";
import ToggleButton from "../../../components/common/toggleButton";

export default function FriendsScreen() {
  const [selected, setSelected] = useState("팔로잉");
  // const { data: followingList = [] } = useGetMyFollowings();
  // const { data: followerList = [] } = useGetMyFollowers();

  // 임시 데이터
  const followingList = [
    {
      userId: 1,
      nickname: "팔로잉유저1",
      profile_img: "https://via.placeholder.com/100",
    },
    {
      userId: 2,
      nickname: "팔로잉유저2",
      profile_img: "https://via.placeholder.com/100",
    },
    {
      userId: 3,
      nickname: "팔로잉유저3",
      profile_img: "https://via.placeholder.com/100",
    },
    {
      userId: 4,
      nickname: "팔로잉유저4",
      profile_img: "https://via.placeholder.com/100",
    },
    {
      userId: 5,
      nickname: "팔로잉유저5",
      profile_img: "https://via.placeholder.com/100",
    },
    {
      userId: 6,
      nickname: "팔로잉유저6",
      profile_img: "https://via.placeholder.com/100",
    },
    {
      userId: 7,
      nickname: "팔로잉유저7",
      profile_img: "https://via.placeholder.com/100",
    },
    {
      userId: 8,
      nickname: "팔로잉유저8",
      profile_img: "https://via.placeholder.com/100",
    },
    {
      userId: 9,
      nickname: "팔로잉유저9",
      profile_img: "https://via.placeholder.com/100",
    },
    {
      userId: 10,
      nickname: "팔로잉유저10",
      profile_img: "https://via.placeholder.com/100",
    },
  ];

  // 임시 데이터
  const followerList = [
    {
      userId: 101,
      nickname: "팔로워유저1",
      profile_img: "https://via.placeholder.com/100",
    },
    {
      userId: 102,
      nickname: "팔로워유저2",
      profile_img: "https://via.placeholder.com/100",
    },
    {
      userId: 103,
      nickname: "팔로워유저3",
      profile_img: "https://via.placeholder.com/100",
    },
    {
      userId: 104,
      nickname: "팔로워유저4",
      profile_img: "https://via.placeholder.com/100",
    },
    {
      userId: 105,
      nickname: "팔로워유저5",
      profile_img: "https://via.placeholder.com/100",
    },
    {
      userId: 106,
      nickname: "팔로워유저6",
      profile_img: "https://via.placeholder.com/100",
    },
    {
      userId: 107,
      nickname: "팔로워유저7",
      profile_img: "https://via.placeholder.com/100",
    },
    {
      userId: 108,
      nickname: "팔로워유저8",
      profile_img: "https://via.placeholder.com/100",
    },
    {
      userId: 109,
      nickname: "팔로워유저9",
      profile_img: "https://via.placeholder.com/100",
    },
    {
      userId: 110,
      nickname: "팔로워유저10",
      profile_img: "https://via.placeholder.com/100",
    },
  ];

  const currentList = selected === "팔로잉" ? followingList : followerList;

  return (
    <SafeAreaView>
      {/* 헤더 */}
      <Header logo={false} title="친구목록" before={true} />

      <View className="bg-white flex-1 px-4 pt-4">
        <ToggleButton
          option1="팔로잉"
          option2="팔로워"
          selected={selected}
          onSelect={setSelected}
        />

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
      </View>
    </SafeAreaView>
  );
}
