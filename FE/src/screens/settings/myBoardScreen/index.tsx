import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/common/header";
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
  // 임시 데이터
  const data: ProfileBoard[] = useMemo(
    () => [
      {
        boardId: 1,
        title: "첫 낚시 후기!",
        content: "오늘은 정말 운이 좋았어요. 큰 고기를 잡았어요!",
        thumbImg: "https://via.placeholder.com/150",
        like: 23,
        commentNum: 5,
        createdAt: "2025-06-19T10:00:00Z",
      },
      {
        boardId: 2,
        title: "비 오는 날의 낚시",
        content: "비가 왔지만 나름의 매력이 있었던 하루였습니다.",
        thumbImg: "https://via.placeholder.com/150",
        like: 12,
        commentNum: 2,
        createdAt: "2025-06-18T08:30:00Z",
      },
      {
        boardId: 3,
        title: "가족과 함께한 낚시 여행",
        content: "가족과 즐거운 시간을 보내며 낚시를 했어요.",
        thumbImg: "https://via.placeholder.com/150",
        like: 45,
        commentNum: 10,
        createdAt: "2025-06-15T14:45:00Z",
      },
    ],
    []
  );

  const sortOptions = ["최신순", "오래된순"];

  // const { data: boards = [] } = useGetMyBoards();

  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);

  const sortedData = useMemo(() => {
    const copyData = [...data];

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
  }, [selectedSort, data]);

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
          renderItem={({ item, index }) => (
            <View
              className={`${index === sortedData.length - 1 ? "" : "my-3"}`}
            >
              <BoardCard board={item} />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
