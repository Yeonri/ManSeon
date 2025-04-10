import { Image, Text, View } from "react-native";
import { User } from "../../../api/types/User";

type ProfileCardUser = Pick<
  User,
  "username" | "profileImg" | "followerCount" | "followingCount" | "nickname"
>;

interface Props {
  user: ProfileCardUser;
}

export function ProfileCard({ user }: Props) {
  return (
    <View className="bg-blue-800 rounded-2xl px-5 py-6 mb-3 mx-4 flex-row items-center">
      {user.profileImg === null ? (
        <Image
          source={require("../../../assets/images/mansun.png")}
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

      <View>
        <View className="flex-row items-center gap-1">
          <Text className="text-white text-xl font-bold">
            {user.nickname ? user.nickname : user.username}
          </Text>
        </View>
        <Text className="text-white text-base mt-1">
          팔로잉 {user.followingCount}명 / 팔로워 {user.followerCount}명
        </Text>
      </View>
    </View>
  );
}
