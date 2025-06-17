import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CommunityStackParams } from "../../../navigation/types";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { useGetFollowingBoard } from "../../../api/queries/board";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { Handshake } from "lucide-react-native";

interface FollowingBoardsNavigationProps
  extends NativeStackNavigationProp<CommunityStackParams, "Community"> {}

export default function FollowingBoards() {
  const navigation = useNavigation<FollowingBoardsNavigationProps>();
  // const { data, refetch } = useGetFollowingBoard();
  const data = {
    data: [
      {
        boardId: 101,
        userId: 111211,
        boardImg:
          "https://i.pinimg.com/736x/84/80/7d/84807de97dc5b3faac935c282b80d98b.jpg",
        profileImg:
          "https://i.pinimg.com/736x/84/80/7d/84807de97dc5b3faac935c282b80d98b.jpg",
      },
      {
        boardId: 102,
        userId: 111212,
        boardImg:
          "https://i.pinimg.com/736x/84/80/7d/84807de97dc5b3faac935c282b80d98b.jpg",
        profileImg:
          "https://i.pinimg.com/736x/84/80/7d/84807de97dc5b3faac935c282b80d98b.jpg",
      },
      {
        boardId: 103,
        userId: 111213,
        boardImg:
          "https://i.pinimg.com/736x/84/80/7d/84807de97dc5b3faac935c282b80d98b.jpg",
        profileImg:
          "https://i.pinimg.com/736x/84/80/7d/84807de97dc5b3faac935c282b80d98b.jpg",
      },
      {
        boardId: 104,
        userId: 111214,
        boardImg:
          "https://i.pinimg.com/736x/84/80/7d/84807de97dc5b3faac935c282b80d98b.jpg",
        profileImg:
          "https://i.pinimg.com/736x/84/80/7d/84807de97dc5b3faac935c282b80d98b.jpg",
      },
    ],
  };

  const friendsBoards = data?.data ?? [];

  function handlePostClick(postId: number) {
    navigation.navigate("PostDetail", { postId });
  }

  function handleUserClick(userId: number) {
    navigation.navigate("UserPage", { userId });
  }

  // useFocusEffect(
  //   useCallback(() => {
  //     refetch;
  //   }, [refetch])
  // );

  return (
    <View className="gap-3">
      <Text className="text-neutral-600 font-semibold">
        내가 팔로잉한 친구 게시글
      </Text>
      {friendsBoards ? (
        <FlatList
          data={friendsBoards}
          renderItem={({ item }) => (
            <View className="relative mx-1 my-1">
              <TouchableOpacity onPress={() => handlePostClick(item.boardId)}>
                <Image
                  source={{
                    uri: item.boardImg,
                  }}
                  className="w-24 h-32 rounded-xl"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleUserClick(item.userId)}>
                <Image
                  source={{
                    uri: item.profileImg,
                  }}
                  className="absolute w-12 h-12 rounded-full bottom-2 left-1/2 -translate-x-1/2 "
                />
              </TouchableOpacity>
            </View>
          )}
          horizontal
        />
      ) : (
        <View className="m-1 h-36 justify-center items-center rounded-xl bg-neutral-50 gap-2">
          <Handshake size={30} color={"#A3A3A3"} strokeWidth={1.2} />
          <Text className="text-neutral-400 text-sm">
            아직 팔로잉한 친구가 없어요.
          </Text>
        </View>
      )}
    </View>
  );
}
