import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { CommunityStackParams } from "../../../navigation/types";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import Header from "../../../components/common/header";
import DefaultImage from "../../../assets/images/image_default.svg";
import formatTime from "../../../utils/formatTime";
import SelectButton from "../../../components/common/selectButton";
import {
  MessageSquareMore,
  Pencil,
  ThumbsUp,
  Trash2,
} from "lucide-react-native";
import CommentInput from "../../../components/community/commentInput";
import Comments from "../../../components/community/comments";

interface BoardDetailScreenProps
  extends NativeStackScreenProps<CommunityStackParams, "BoardDetail"> {}

interface BoardDetailScreenNavigationProps
  extends NativeStackNavigationProp<CommunityStackParams, "AddBoard"> {}

export default function BoardDetailScreen({ route }: BoardDetailScreenProps) {
  const { boardId } = route.params;
  const navigation = useNavigation<BoardDetailScreenNavigationProps>();
  // const { data, refetch } = useGetBoardDetail(boardId);

  const dataMap = [
    {
      userId: 111211,
      boardId: 1,
      title: "이번 주말 출조 후기!",
      content: "이번 주말에 동해로 출조 다녀왔습니다. 광어 손맛이 정말 좋네요!",
      nickname: "낚시왕김춘배",
      createdAt: new Date(Date.now() - 3600 * 1000 * 3).toISOString(),
      commentNum: 5,
      like: 12,
      profileImg: "",
      thumbImg:
        "https://cdn.pixabay.com/photo/2017/06/17/04/20/fishing-2411145_1280.jpg",
    },
    {
      userId: 111212,
      boardId: 2,
      title: "초보자를 위한 루어 낚시 팁",
      content:
        "루어 낚시를 처음 시작하시는 분들을 위해 기본적인 정보 정리했습니다.",
      nickname: "강태공",
      createdAt: new Date(Date.now() - 3600 * 1000 * 24).toISOString(),
      commentNum: 3,
      like: 8,
      profileImg: "",
      thumbImg:
        "https://cdn.pixabay.com/photo/2020/02/02/20/48/sunrise-4814118_1280.jpg",
    },
    {
      userId: 111213,
      boardId: 3,
      title: "갈치 낚시 포인트 추천",
      content: "가을철 갈치 낚시하기 좋은 포인트 몇 군데 공유합니다!",
      nickname: "물반고기반",
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      commentNum: 0,
      like: 2,
      thumbImg:
        "https://cdn.pixabay.com/photo/2018/10/19/09/39/lake-3758247_1280.jpg",
      profileImg: "",
    },
    {
      userId: 111214,
      boardId: 4,
      title: "민물 붕어 낚시 성공기!",
      content: "어제 저녁에 붕어 낚시 다녀왔는데, 40cm급 붕어를 잡았습니다!",
      nickname: "강태공",
      createdAt: new Date(Date.now() - 3600 * 1000 * 24).toISOString(),
      commentNum: 3,
      like: 8,
      thumbImg:
        "https://cdn.pixabay.com/photo/2016/08/05/14/48/fishing-1572408_1280.jpg",
      profileImg: "",
    },
  ];

  // [임시] 추후 삭제 예정
  function getMockBoardById(id: number) {
    return dataMap.find((item) => item.boardId === id);
  }

  const data = getMockBoardById(boardId);

  function handleDelete() {
    // [임시] useDeleteBoard로 대체 예정
    Alert.alert("삭제", "입력된 내용을 취소하시겠습니까?", [
      { text: "취소", style: "cancel" },
      {
        text: "확인",
        style: "destructive",
        onPress: () => {
          navigation.reset({
            index: 0,
            routes: [{ name: "Community" }],
          });
        },
      },
    ]);
  }

  return (
    <SafeAreaView>
      {/* 헤더 */}
      <Header logo={true} before={true} />

      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 32 }}>
        {data && (
          <View className="mx-5 gap-3">
            {/* 제목 */}
            <Text className="text-neutral-800 font-bold">{data.title}</Text>

            {/* 작성자 정보, 게시글 수정 및 삭제 */}
            <View className="flex-row items-center justify-between">
              {/* 작성자 정보 */}
              <View className="flex-row items-center gap-2">
                <TouchableOpacity
                  onPress={
                    () => {}
                    // navigation.navigate("UserPage", {
                    //   userId: data.userId,
                    // })
                  }
                  className="flex-row items-center gap-2"
                >
                  {data.profileImg ? (
                    <Image
                      source={{ uri: data.profileImg }}
                      className="w-[22px] h-[22px] rounded-full"
                    />
                  ) : (
                    <View
                      style={{
                        borderRadius: 16,
                        overflow: "hidden",
                      }}
                    >
                      <DefaultImage width={22} height={22} />
                    </View>
                  )}
                  <Text className=" text-neutral-600 text-sm font-semibold">
                    {data.nickname}
                  </Text>
                </TouchableOpacity>

                {/* 팔로잉 여부 */}
                <View>
                  <SelectButton
                    name="팔로잉"
                    fill={false}
                    follow={true}
                    onPress={() => {}}
                  />
                </View>
              </View>

              {/* 게시글 수정 및 삭제 */}
              <View className="flex-row items-center gap-2">
                <View className="flex-row items-center gap-1">
                  {/* 수정 */}
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("EditBoard", {
                        boardId: boardId,
                        title: data.title,
                        content: data.content,
                        image: data.thumbImg,
                      })
                    }
                  >
                    <Pencil color={"#A3A3A3"} size={14} />
                  </TouchableOpacity>

                  {/* 삭제 */}
                  <TouchableOpacity onPress={handleDelete}>
                    <Trash2 color={"#A3A3A3"} size={14} />
                  </TouchableOpacity>
                </View>

                {/* 작성 시간 */}
                <Text className="text-neutral-400 text-xs">
                  {formatTime(data.createdAt)}
                </Text>
              </View>
            </View>

            {/* 본문 */}
            {/* 게시글 사진 */}
            {data.thumbImg ? (
              <Image
                source={{ uri: `${data.thumbImg}` }}
                className="w-full h-60 rounded-xl"
              />
            ) : null}
            {/* 게시글 내용 */}
            <Text className="text-neutral-800 text-sm">{data.content}</Text>

            {/* 구분선 */}
            <View className="mt-2 w-full h-px bg-neutral-100" />

            <View className="flex-row gap-3">
              {/* 댓글 수 */}
              <View className="flex-row gap-1 items-center">
                <MessageSquareMore
                  fill={"#FFFFFF"}
                  color={"#3B82F6"}
                  size={16}
                />
                <Text className="text-neutral-600 text-sm">
                  {data.commentNum}
                </Text>
              </View>

              {/* 좋아요 수 */}
              <View className="flex-row gap-1 items-center">
                <ThumbsUp fill={"#FFFFFF"} color={"#3B82F6"} size={16} />
                <Text className="text-neutral-600 text-sm">{data.like}</Text>
              </View>
            </View>

            {/* 댓글 입력창 */}
            <CommentInput boardId={boardId} />

            {/* 댓글 목록 */}
            <Comments boardId={boardId} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
