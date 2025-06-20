import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ChevronRight } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { SettingsStackParams } from "../../../navigation/types";
import { useGetMyBoards } from "../../../api/queries/board";
import BoardCard from "../boardCard";

interface SettingScreenNavigationProps
  extends NativeStackNavigationProp<SettingsStackParams, "Settings"> {}

export function MyBoardList() {
  const navigation = useNavigation<SettingScreenNavigationProps>();
  // const { data: boards = [] } = useGetMyBoards();

  // 임시 데이터
  const boards = [
    {
      boardId: 1,
      title: "낚시 다녀왔어요!",
      content:
        "오늘은 친구들과 함께 낚시를 다녀왔어요. 날씨도 좋고 손맛도 좋았습니다!",
      thumbImg: "https://source.unsplash.com/featured/?fishing",
      like: 12,
      commentNum: 4,
      createdAt: "2024-11-20T10:15:00Z",
    },
    {
      boardId: 2,
      title: "조용한 강가에서의 하루",
      content: "혼자 조용히 강가에 앉아 낚시를 하니 힐링되는 느낌이에요.",
      thumbImg: "https://source.unsplash.com/featured/?river,fishing",
      like: 8,
      commentNum: 2,
      createdAt: "2024-12-05T14:30:00Z",
    },
    {
      boardId: 3,
      title: "처음 잡은 물고기!",
      content: "낚시 처음 했는데 바로 한 마리 잡아서 기분 최고입니다 😆",
      thumbImg: "https://source.unsplash.com/featured/?fish,catch",
      like: 20,
      commentNum: 7,
      createdAt: "2025-01-03T09:00:00Z",
    },
  ];

  return (
    <View className="gap-3">
      <TouchableOpacity
        className="flex-row items-center gap-1"
        onPress={() => navigation.navigate("MyBoard")}
      >
        <Text className="text-neutral-600 font-bold -translate-y-[2px]">
          내가 쓴 게시글
        </Text>

        <ChevronRight color="#525252" width={20} />
      </TouchableOpacity>

      {boards.slice(0, 3).map((board) => (
        <BoardCard key={board.boardId} board={board} />
      ))}
    </View>
  );
}
