import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CommunityStackParams } from "../../../navigation/types";
import { useNavigation } from "@react-navigation/native";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { Handshake } from "lucide-react-native";

interface FollowingBoardsNavigationProps
  extends NativeStackNavigationProp<CommunityStackParams, "Community"> {}

export default function FollowingBoards() {
  const navigation = useNavigation<FollowingBoardsNavigationProps>();
  // const { data, refetch } = useGetFollowingBoard();
  const data = {
    data: [
      {
        boardId: 1,
        userId: 111211,
        profileImg: "",
        thumbImg:
          "https://cdn.pixabay.com/photo/2017/06/17/04/20/fishing-2411145_1280.jpg",
      },
      {
        boardId: 2,
        userId: 111212,
        profileImg: "",
        thumbImg:
          "https://cdn.pixabay.com/photo/2020/02/02/20/48/sunrise-4814118_1280.jpg",
      },
      {
        boardId: 3,
        userId: 111213,
        profileImg: "",
        thumbImg:
          "https://cdn.pixabay.com/photo/2018/10/19/09/39/lake-3758247_1280.jpg",
      },
      {
        boardId: 4,
        userId: 111214,
        thumbImg:
          "https://cdn.pixabay.com/photo/2016/08/05/14/48/fishing-1572408_1280.jpg",
        profileImg: "",
      },
    ],
  };

  const friendsBoards = data?.data ?? [];

  function handleClick(boardId: number) {
    navigation.navigate("BoardDetail", { boardId });
  }

  function handleUserClick(userId: number) {
    // navigation.navigate("UserPage", { userId });
  }

  // useFocusEffect(
  //   useCallback(() => {
  //     refetch;
  //   }, [refetch])
  // );

  return (
    <View className="gap-3">
      <Text className="text-neutral-600 font-semibold">
        내가 팔로잉한 친구 게시글
      </Text>
      {friendsBoards ? (
        <FlatList
          data={friendsBoards}
          renderItem={({ item }) => (
            <View className="relative mx-1 my-1">
              <TouchableOpacity onPress={() => handleClick(item.boardId)}>
                <Image
                  source={{
                    uri: item.thumbImg,
                  }}
                  className="w-24 h-32 rounded-xl"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleUserClick(item.userId)}>
                <Image
                  source={{
                    uri: item.profileImg,
                  }}
                  className="absolute w-12 h-12 rounded-full bottom-2 left-1/2 -translate-x-1/2 "
                />
              </TouchableOpacity>
            </View>
          )}
          horizontal
        />
      ) : (
        <View className="m-1 h-36 justify-center items-center rounded-xl bg-neutral-50 gap-2">
          <Handshake size={30} color={"#A3A3A3"} strokeWidth={1.2} />
          <Text className="text-neutral-400 text-sm">
            아직 팔로잉한 친구가 없어요.
          </Text>
        </View>
      )}
    </View>
  );
}
