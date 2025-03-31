import { useMemo, useState } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { Post } from "../../api/types/post";
import Dropdown from "../../components/common/dropdown";
import { HeaderBeforeTitle } from "../../components/common/headerBeforeTitle";
import { PostCard } from "../../components/profile/postCard";
import UserMock from "../../mocks/userMocks.json";

type ProfilePost = Pick<
  Post,
  | "postId"
  | "title"
  | "content"
  | "postImg"
  | "like"
  | "commentNum"
  | "createAt"
>;

const sortOptions = ["최신순", "오래된순"];

export function MyPostsScreen() {
  const user = UserMock[0];
  const posts = user.posts;

  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);

  const sortedData = useMemo(() => {
    const copyData = [...posts];

    if (selectedSort === "최신순") {
      return copyData.sort(
        (a, b) =>
          new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
      );
    }

    if (selectedSort === "오래된순") {
      return copyData.sort(
        (a, b) =>
          new Date(a.createAt).getTime() - new Date(b.createAt).getTime()
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
          keyExtractor={(item) => item.postId.toString()}
          renderItem={({ item }) => <PostCard post={item} />}
          contentContainerStyle={{ paddingBottom: 150 }}
        />
      </View>
    </SafeAreaView>
  );
}
