import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { CommunityStackParams } from "../../../api/types/CommunityStackParams";
import { useUserStore } from "../../../store/userStore";
import { useGetFriendsPosts } from "../../../api/quries/usePost";
import { Handshake } from "lucide-react-native";
import { useCallback } from "react";

interface CommunityScreenNavigationProps
  extends NativeStackNavigationProp<CommunityStackParams, "Community"> {}

export function FollowingPost() {
  const navigation = useNavigation<CommunityScreenNavigationProps>();
  const userId = useUserStore((state) => state.user!.id);
  const { data: friendsPosts, refetch } = useGetFriendsPosts(userId);
  // console.log("친구 게시글: ", friendsPosts);

  function handlePostClick(postId: number) {
    navigation.navigate("Post", { postId });
  }

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  return (
    <View>
      <Text className="text-neutral-600 font-semibold mb-1">
        내가 팔로잉한 친구 게시글
      </Text>
      {friendsPosts === null ? (
        <FlatList
          data={friendsPosts}
          renderItem={({ item }) => (
            <View className="relative mx-1 my-1">
              <TouchableOpacity onPress={() => handlePostClick(item.postId)}>
                <Image
                  source={{
                    uri: item.postImg,
                  }}
                  className="w-24 h-36 rounded-xl"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
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
        <View className="h-36 justify-center items-center rounded-xl bg-neutral-100 mx-1 my-1 gap-2">
          <Handshake size={40} color={"#525252"} strokeWidth={1.2} />
          <Text className="text-neutral-600">아직 팔로잉한 친구가 없어요!</Text>
        </View>
      )}
    </View>
  );
}
