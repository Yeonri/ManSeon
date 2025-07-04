import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Heart, MessageSquareMore } from "lucide-react-native";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useGetPosts } from "../../../api/quries/usePost";
import { CommunityStackParams } from "../../../api/types/CommunityStackParams";
import DefaultImage from "../../../assets/images/image_default.svg";
// import { FormatTime } from "../../../utils/formatTime";
import { useCallback } from "react";

interface CommunityScreenNavigationProps
  extends NativeStackNavigationProp<CommunityStackParams, "Community"> {}

export function PostList() {
  const navigation = useNavigation<CommunityScreenNavigationProps>();
  const { data: response, refetch } = useGetPosts();
  // console.log("응답 전체 :", response);

  const posts = response?.data ?? [];
  console.log("전체 게시글:", posts);

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
          <TouchableOpacity onPress={() => handlePostClick(item.boardId)}>
            <View className="bg-blue-50 my-1 p-3 rounded-xl flex-row justify-between items-center">
              <View>
                {/* 제목 */}
                <Text className="font-bold mb-1 text-lg text-neutral-800">
                  {item.title}
                </Text>
                <View className="flex-row items-center mb-2">
                  {/* 작성자 프로필 이미지, 이미지가 없는 경우 기본 이미지 */}
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
                      <DefaultImage width={32} height={32} />
                    </View>
                  )}
                  {/* 닉네임 */}
                  <Text className="mr-3 font-semibold text-neutral-600">
                    {item.nickname}
                  </Text>
                  {/* 작성 시간 */}
                  {/* <Text className="text-neutral-600">
                    {FormatTime(item.createdAt)}
                  </Text> */}
                </View>
                <View className="flex-row gap-3">
                  {/* 댓글 수 */}
                  <View className="flex-row gap-1 items-center">
                    <MessageSquareMore
                      fill={"#FFFFFF"}
                      color={"#525252"}
                      size={18}
                    />
                    <Text>{item.commentNum}</Text>
                  </View>
                  {/* 좋아요 수 */}
                  <View className="flex-row gap-1 items-center">
                    <Heart fill={"#FFFFFF"} color={"#525252"} size={18} />
                    <Text>{item.like}</Text>
                  </View>
                </View>
              </View>
              {/* 게시글 이미지, 이미지가 없는 경우 기본 이미지 */}
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
                  <DefaultImage width={84} height={84} />
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
