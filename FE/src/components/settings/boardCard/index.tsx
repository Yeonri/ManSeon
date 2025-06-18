import { Image, Text, TouchableOpacity, View } from "react-native";
import { Board } from "../../../types/Board";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SettingsStackParams } from "../../../navigation/types";
import DefaultImage from "../../../assets/images/image_default.svg";
import { MessageSquareMore, ThumbsUp } from "lucide-react-native";
import formatTime from "../../../utils/formatTime";

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

interface BoardCardProps {
  board: ProfileBoard;
}

interface BoardCardNavigationProps
  extends NativeStackNavigationProp<SettingsStackParams, "MyBoard"> {}

export default function BoardCard({ board }: BoardCardProps) {
  const navigation = useNavigation<BoardCardNavigationProps>();

  function handleBoardClick(boardId: number) {
    navigation.navigate("BoardDetail", { boardId });
    console.log(boardId);
  }
  return (
    <TouchableOpacity onPress={() => handleBoardClick(board.boardId)}>
      <View className="p-4 flex-row justify-between items-center bg-blue-50 rounded-xl">
        <View className="gap-2">
          {/* 제목 */}
          <Text className="text-neutral-800 text-sm font-bold">
            {board.title}
          </Text>
          <Text className="text-neutral-800 text-xs">{board.content}</Text>

          {/* 작성 시간 */}
          <Text className="text-neutral-400 text-xs">
            {formatTime(board.createdAt)}
          </Text>

          <View className="flex-row gap-3">
            {/* 댓글 수 */}
            <View className="flex-row gap-1 items-center">
              <MessageSquareMore fill={"#FFFFFF"} color={"#3B82F6"} size={16} />
              <Text className="text-neutral-600 text-sm">
                {board.commentNum}
              </Text>
            </View>

            {/* 좋아요 수 */}
            <View className="flex-row gap-1 items-center">
              <ThumbsUp fill={"#FFFFFF"} color={"#3B82F6"} size={16} />
              <Text className="text-neutral-600 text-sm">{board.like}</Text>
            </View>
          </View>
        </View>

        {/* 게시글 이미지, 이미지가 없는 경우 기본 이미지 */}
        {board.thumbImg ? (
          <Image
            source={{ uri: `${board.thumbImg}` }}
            className="w-[75px] h-[75px] rounded-lg"
          />
        ) : (
          <View
            style={{
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            <DefaultImage width={75} height={75} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
