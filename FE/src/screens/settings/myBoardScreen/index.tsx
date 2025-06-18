import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/common/header";
import { useGetMyBoards } from "../../../api/queries/board";
import { useMemo, useState } from "react";
import Dropdown from "../../../components/common/dropdown";
import BoardCard from "../../../components/settings/boardCard";
import { Board } from "../../../types/Board";

type ProfileBoard = Pick<
  Board,
  | "boardId"
  | "title"
  | "content"
  | "thumbImg"
  | "like"
  | "commentNum"
  | "createdAt"
>;

export default function MyBoardScreen() {
  const sortOptions = ["최신순", "오래된순"];

  const { data: boards = [] } = useGetMyBoards();

  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);

  const sortedData = useMemo(() => {
    const copyData = [...boards];

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
  }, [selectedSort, boards]);

  return (
    <SafeAreaView>
      {/* 헤더 */}
      <Header logo={false} title="내 게시글" before={true} />

      <View className="mx-5 mb-10">
        <View className="px-5 mt-4 mb-5 items-end">
          <Dropdown
            options={sortOptions}
            selected={selectedSort}
            onSelect={setSelectedSort}
          />
        </View>
        <FlatList<ProfileBoard>
          data={sortedData as ProfileBoard[]}
          keyExtractor={(item) => item.boardId.toString()}
          renderItem={({ item }) => <BoardCard board={item} />}
        />
      </View>
    </SafeAreaView>
  );
}
