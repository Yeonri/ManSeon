import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { CommunityStackParams } from "../../../api/types/CommunityStackParams";
import { useGetPosts } from "../../../api/quries/usePost";
import DefaultProfile from "../../../assets/images/profile_default.svg";
import DefaultImage from "../../../assets/images/image_default.svg";
import { Heart, MessageSquareMore } from "lucide-react-native";
import { FormatTime } from "../../../utils/formatTime";
import { useCallback } from "react";

interface CommunityScreenNavigationProps
  extends NativeStackNavigationProp<CommunityStackParams, "Community"> {}

export function PostList() {
  const navigation = useNavigation<CommunityScreenNavigationProps>();
  const { data: posts, refetch } = useGetPosts();
  // console.log("전체 게시글 :", posts);

  function handlePostClick(postId: number) {
    navigation.navigate("Post", { postId });
    console.log(postId);
  }

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  return (
    <View className="mt-3 mb-5">
      <Text className="text-neutral-600 font-semibold mb-1">최신 게시글</Text>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePostClick(item.postId)}>
            <View className="bg-blue-50 my-1 p-3 rounded-xl flex-row justify-between items-center">
              <View>
                <Text className="font-bold mb-1 text-lg text-neutral-800">
                  {item.title}
                </Text>
                <View className="flex-row items-center mb-2">
                  {item.profileImg ? (
                    <Image
                      source={{ uri: item.profileImg }}
                      className="w-8 h-8 mr-2 rounded-full"
                    />
                  ) : (
                    <View
                      style={{
                        borderRadius: 16,
                        overflow: "hidden",
                        marginRight: 8,
                      }}
                    >
                      <DefaultProfile width={32} height={32} />
                    </View>
                  )}
                  <Text className="mr-3 font-semibold text-neutral-600">
                    {item.nickname}
                  </Text>
                  <Text className="text-neutral-600">
                    {FormatTime(item.createdAt)}
                  </Text>
                </View>
                <View className="flex-row gap-3">
                  <View className="flex-row gap-1 items-center">
                    <MessageSquareMore
                      fill={"#FFFFFF"}
                      color={"#525252"}
                      size={18}
                    />
                    <Text>{item.commentNum}</Text>
                  </View>
                  <View className="flex-row gap-1 items-center">
                    <Heart fill={"#8EC5FF"} color={"#8EC5FF"} size={18} />
                    <Text>{item.like}</Text>
                  </View>
                </View>
              </View>
              {item.postImg ? (
                <Image
                  source={{ uri: item.postImg }}
                  className="w-24 h-24 rounded-md"
                />
              ) : (
                <View
                  style={{
                    borderRadius: 8,
                    overflow: "hidden",
                  }}
                >
                  <DefaultImage width={96} height={96} />
                </View>
              )}
            </View>
          </TouchableOpacity>
        )}
        scrollEnabled={false}
      />
    </View>
  );
}
