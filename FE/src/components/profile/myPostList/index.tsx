import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ChevronRight } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { useGetMyPost } from "../../../api/quries/usePost";
import { MoreStackParams } from "../../../types/MoreStackParams";
import { PostCard } from "../postCard";

interface MoreScreenNavigationProps
  extends NativeStackNavigationProp<MoreStackParams, "More"> {}

export function MyPostList() {
  const navigation = useNavigation<MoreScreenNavigationProps>();
  const { data: posts = [] } = useGetMyPost();

  console.log("게시글 확인:", posts);

  return (
    <View className="mt-4">
      <TouchableOpacity
        className="flex-row items-center px-4 mb-2"
        onPress={() => navigation.navigate("MyPosts")}
      >
        <Text className="font-bold text-base text-neutral-800">
          내가 쓴 게시글
        </Text>
        <ChevronRight color="#262626" />
      </TouchableOpacity>

      <View className="px-4">
        {posts.slice(0, 3).map((post) => (
          <PostCard key={post.boardId} post={post} />
        ))}
      </View>
    </View>
  );
}
