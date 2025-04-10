import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ChevronRight, PencilLine } from "lucide-react-native";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetMyInfo } from "../../api/quries/useMyinfo";
import { useMyPosts } from "../../api/quries/useMypost";
import { MoreStackParams } from "../../api/types/MoreStackParams";
import { HeaderBeforeLogo } from "../../components/common/headerBeforeLogo";
import { BadgeList } from "../../components/profile/badgeList";
import { MyPostList } from "../../components/profile/myPostList";

interface MoreScreenNavigationProps
  extends NativeStackNavigationProp<MoreStackParams, "More"> {}

export function ProfileScreen() {
  const navigation = useNavigation<MoreScreenNavigationProps>();

  const { data: user } = useGetMyInfo();
  const { data: posts } = useMyPosts();

  const collectionCount = Object.values(
    user.fishCollections as Record<string, any[]>
  ).filter((arr) => arr.length > 0).length;

  const progress = (collectionCount / 24) * 100;

  return (
    <SafeAreaView>
      <HeaderBeforeLogo />
      <ScrollView className="mb-5">
        <View className="items-center mt-6 mb-6">
          {user.profileImg === null ? (
            <Image
              source={require("../../assets/images/mansun.png")}
              className="w-24 h-24 rounded-full mr-4 bg-white"
              resizeMode="contain"
            />
          ) : (
            <Image
              source={{
                uri: user.profileImg,
              }}
              className="w-24 h-24 rounded-full mr-4 bg-white"
              resizeMode="center"
            />
          )}

          <TouchableOpacity
            className="flex-row items-center mt-2"
            onPress={() => navigation.navigate("ProfileEdit")}
          >
            <Text className="text-2xl font-bold mr-1 text-blue-800 ">
              {user.nickname ? user.nickname : user.name}
            </Text>
            <PencilLine color="#737373" width={24} />
          </TouchableOpacity>

          <View className="flex-row justify-center mt-4 gap-4">
            <View className="items-center mx-4">
              <Text className="text-lg font-semibold">게시글</Text>
              <Text className="text-lg font-bold text-blue-600">
                {posts?.length ?? 0}개
              </Text>
            </View>
            <View className="w-px h-10 bg-neutral-400 self-center" />
            <TouchableOpacity
              className="items-center mx-4"
              onPress={() => navigation.navigate("Friends")}
            >
              <Text className="text-lg font-semibold text-neutral-500">
                팔로잉
              </Text>
              <Text className="text-lg font-bold text-blue-600">
                {user.followingCount}명
              </Text>
            </TouchableOpacity>
            <View className="w-px h-10 bg-neutral-400 self-center" />
            <TouchableOpacity
              className="items-center mx-4"
              onPress={() => navigation.navigate("Friends")}
            >
              <Text className="text-lg font-semibold text-neutral-500">
                팔로워
              </Text>
              <Text className="text-lg font-bold text-blue-600">
                {user.followerCount}명
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("CollectionList")}>
          <View className="flex-row items-center mx-5">
            <Text className="text-lg font-bold text-neutral-800">
              도감 현황
            </Text>
            <ChevronRight />
          </View>
          <View className="bg-blue-100 rounded-2xl px-4 py-3 mx-5 mt-3">
            <View className="flex-row items-baseline gap-2">
              <Text className="text-5xl font-extrabold text-blue-600">
                {collectionCount}
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

        <BadgeList badgeIds={[1, 2, 3, 4, 5, 6, 7, 8, 9]} user={user} />

        <View className="mb-10">
          <MyPostList />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
