import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MoreStackParams } from "../../api/types/moreStackParams";
import type { Post } from "../../api/types/post";
import IconEdit from "../../assets/images/icon_edit.svg";
import IconMove from "../../assets/images/icon_move.svg";
import { HeaderBeforeLogo } from "../../components/common/headerBeforeLogo";
import { BadgeList } from "../../components/profile/badgeList";
import { MyPostList } from "../../components/profile/myPostList";
import userData from "../../mocks/userMocks.json";

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

interface MoreScreenNavigationProps
  extends NativeStackNavigationProp<MoreStackParams, "More"> {}

export function ProfileScreen() {
  const navigation = useNavigation<MoreScreenNavigationProps>();
  const user = userData[0];

  const progress = (user.collection__cnt / 24) * 100;

  return (
    <SafeAreaView>
      <HeaderBeforeLogo />
      <ScrollView className="mb-5">
        <View className="items-center mt-6 mb-6">
          <Image
            source={{ uri: user.profile_img }}
            className="w-24 h-24 rounded-full"
          />
          <View className="flex-row items-center mt-2">
            <Text className="text-2xl font-bold mr-1 text-blue-800 ">
              {user.name}
            </Text>

            <IconEdit />
          </View>
          <View className="flex-row justify-center mt-4 gap-4">
            <View className="items-center mx-4">
              <Text className="text-lg font-semibold">게시글</Text>
              <Text className="text-lg font-bold text-blue-600">
                {user.posts.length}개
              </Text>
            </View>
            <View className="w-px h-10 bg-neutral-400 self-center" />
            <View className="items-center mx-4">
              <Text className="text-lg font-semibold text-neutral-500">
                팔로잉
              </Text>
              <Text className="text-lg font-bold text-blue-600">
                {user.following_cnt}명
              </Text>
            </View>
            <View className="w-px h-10 bg-neutral-400 self-center" />
            <View className="items-center mx-4">
              <Text className="text-lg font-semibold text-neutral-500">
                팔로워
              </Text>
              <Text className="text-lg font-bold text-blue-600">
                {user.follower_cnt}명
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("CollectionList")}>
          <View className="flex-row items-center mx-5">
            <Text className="text-lg font-bold text-neutral-800">
              도감 현황
            </Text>
            <IconMove />
          </View>
          <View className="bg-blue-100 rounded-2xl px-4 py-3 mx-5 mt-3">
            <View className="flex-row items-baseline gap-2">
              <Text className="text-5xl font-extrabold text-blue-600">
                {user.collection__cnt}
              </Text>
              <Text className="text-3xl text-neutral-400 font-bold ml-1">
                / 24
              </Text>
            </View>

            <View className="h-4 bg-blue-50 rounded-full mt-2 overflow-hidden">
              <View
                className="h-full bg-blue-600 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </View>
          </View>
        </TouchableOpacity>
        <BadgeList
          badges={user.badges.map(({ id, is_earned }) => ({ id, is_earned }))}
        />
        <MyPostList posts={user.posts as ProfilePost[]} />
      </ScrollView>
    </SafeAreaView>
  );
}
