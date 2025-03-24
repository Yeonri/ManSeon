import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { CommunityStackParams } from "../../../api/types/communityStackParams";
import IconComment from "../../../assets/images/icon_comment.svg";
import IconLike from "../../../assets/images/icon_like.svg";
import postsMocks from "../../../mocks/postsMocks.json";

interface CommunityScreenNavigationProps
  extends NativeStackNavigationProp<CommunityStackParams, "Community"> {}

export function PostList() {
  const navigation = useNavigation<CommunityScreenNavigationProps>();

  function handlePostClick(postId: number) {
    navigation.navigate("Post", { postId });
  }

  function formatTime(time: string) {
    return formatDistanceToNow(new Date(time), { addSuffix: true, locale: ko });
  }

  return (
    <FlatList
      data={postsMocks}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handlePostClick(item.postId)}>
          <View className="bg-blue-50 my-1 p-3 rounded-xl flex-row justify-between items-center">
            <View>
              <Text className="font-bold mb-2 text-lg">{item.title}</Text>
              <View className="flex-row items-center mb-2">
                <Image
                  source={{ uri: item.profileImg }}
                  className="w-8 h-8 mr-2 rounded-full"
                />
                <Text className="mr-3 font-semibold">{item.nickname}</Text>
                <Text>{formatTime(item.createAt)}</Text>
              </View>
              <View className="flex-row gap-3">
                <View className="flex-row gap-1">
                  <IconComment />
                  <Text>{item.commentNum}</Text>
                </View>
                <View className="flex-row gap-1">
                  <IconLike />
                  <Text>{item.like}</Text>
                </View>
              </View>
            </View>
            <Image source={{ uri: item.postImg }} className="w-24 h-24" />
          </View>
        </TouchableOpacity>
      )}
    />
  );
}
