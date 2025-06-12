import { useMemo, useState } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMyPosts } from "../../../api/quries/useMypost";
import Dropdown from "../../../components/common/dropdown";
import { HeaderBeforeTitle } from "../../../components/common/headerBeforeTitle";
import { PostCard } from "../../../components/profile/postCard";
import type { Post } from "../../../types/Post";

type ProfilePost = Pick<
  Post,
  | "postId"
  | "title"
  | "content"
  | "postImg"
  | "like"
  | "commentNum"
  | "createdAt"
>;

const sortOptions = ["최신순", "오래된순"];

export function MyPostsScreen() {
  const { data: posts = [] } = useMyPosts();

  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);

  const sortedData = useMemo(() => {
    const copyData = [...posts];

    if (selectedSort === "최신순") {
      return copyData.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    if (selectedSort === "오래된순") {
      return copyData.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    }

    return copyData;
  }, [selectedSort, posts]);

  return (
    <SafeAreaView>
      <HeaderBeforeTitle name="내 게시글" />
      <View className="mx-5 mb-10">
        <View className="px-5 mt-4 mb-5 items-end">
          <Dropdown
            options={sortOptions}
            selected={selectedSort}
            onSelect={setSelectedSort}
          />
        </View>
        <FlatList<ProfilePost>
          data={sortedData as ProfilePost[]}
          keyExtractor={(item) => item.boardId.toString()}
          renderItem={({ item }) => <PostCard post={item} />}
        />
      </View>
    </SafeAreaView>
  );
}
