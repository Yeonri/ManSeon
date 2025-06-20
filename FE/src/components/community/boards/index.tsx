import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CommunityStackParams } from "../../../navigation/types";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import DefaultImage from "../../../assets/images/image_default.svg";
import formatTime from "../../../utils/formatTime";
import { MessageSquareMore, ThumbsUp } from "lucide-react-native";

interface BoardsNavigationProps
  extends NativeStackNavigationProp<CommunityStackParams, "Community"> {}

export default function Boards() {
  const navigation = useNavigation<BoardsNavigationProps>();
  //   const { data, refetch } = useGetBoards();

  // 임시 데이터
  const data = {
    data: [
      {
        boardId: 1,
        title: "이번 주말 출조 후기!",
        nickname: "낚시왕김춘배",
        createdAt: new Date(Date.now() - 3600 * 1000 * 3).toISOString(),
        commentNum: 5,
        like: 12,
        profileImg: "",
        thumbImg:
          "https://cdn.pixabay.com/photo/2017/06/17/04/20/fishing-2411145_1280.jpg",
      },
      {
        boardId: 2,
        title: "이게 바로 대어!",
        nickname: "강태공",
        createdAt: new Date(Date.now() - 3600 * 1000 * 24).toISOString(),
        commentNum: 3,
        like: 8,
        profileImg: "",
        thumbImg:
          "https://cdn.pixabay.com/photo/2020/02/02/20/48/sunrise-4814118_1280.jpg",
      },
      {
        boardId: 3,
        title: "오늘 날씨 미쳤다",
        nickname: "물반고기반",
        createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        commentNum: 0,
        like: 2,
        thumbImg:
          "https://cdn.pixabay.com/photo/2018/10/19/09/39/lake-3758247_1280.jpg",
        profileImg: "",
      },
      {
        boardId: 4,
        title: "제목",
        nickname: "강태공",
        createdAt: new Date(Date.now() - 3600 * 1000 * 24).toISOString(),
        commentNum: 3,
        like: 8,
        thumbImg:
          "https://cdn.pixabay.com/photo/2016/08/05/14/48/fishing-1572408_1280.jpg",
        profileImg: "",
      },
    ],
  };

  const boards = data?.data ?? [];

  function handleBoardClick(boardId: number) {
    navigation.navigate("BoardDetail", { boardId });
    console.log(boardId);
  }

  //   useFocusEffect(
  //     useCallback(() => {
  //       refetch();
  //     }, [refetch])
  //   );

  return (
    <View className="gap-3">
      <Text className="text-neutral-600 font-semibold">최신 게시글</Text>
      <FlatList
        data={boards}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleBoardClick(item.boardId)}>
            <View className="my-1 p-4 flex-row justify-between items-center bg-blue-50 rounded-xl ">
              <View className="gap-2">
                {/* 제목 */}
                <Text className="text-neutral-800 font-bold">{item.title}</Text>

                <View className="mb-2 flex-row items-center gap-2">
                  {/* 작성자 프로필 이미지, 이미지가 없는 경우 기본 이미지 */}
                  {item.profileImg ? (
                    <Image
                      source={{ uri: item.profileImg }}
                      className="w-[20px] h-[20px] rounded-full"
                    />
                  ) : (
                    <View
                      style={{
                        borderRadius: 16,
                        overflow: "hidden",
                      }}
                    >
                      <DefaultImage width={20} height={20} />
                    </View>
                  )}

                  {/* 닉네임 */}
                  <Text className="text-neutral-600 font-semibold text-xs">
                    {item.nickname}
                  </Text>

                  {/* 작성 시간 */}
                  <Text className="text-neutral-400 text-xs">
                    {formatTime(item.createdAt)}
                  </Text>
                </View>

                <View className="flex-row gap-3">
                  {/* 댓글 수 */}
                  <View className="flex-row gap-1 items-center">
                    <MessageSquareMore
                      fill={"#FFFFFF"}
                      color={"#3B82F6"}
                      size={16}
                    />
                    <Text className="text-neutral-600 text-sm">
                      {item.commentNum}
                    </Text>
                  </View>

                  {/* 좋아요 수 */}
                  <View className="flex-row gap-1 items-center">
                    <ThumbsUp fill={"#FFFFFF"} color={"#3B82F6"} size={16} />
                    <Text className="text-neutral-600 text-sm">
                      {item.like}
                    </Text>
                  </View>
                </View>
              </View>

              {/* 게시글 이미지, 이미지가 없는 경우 기본 이미지 */}
              {item.thumbImg ? (
                <Image
                  source={{ uri: `${item.thumbImg}` }}
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
        )}
        scrollEnabled={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 52 }}
      />
    </View>
  );
}
