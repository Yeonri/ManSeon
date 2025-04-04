import { Image, Text, View } from "react-native";
import { User } from "../../../api/types/User";

type ProfileCardUser = Pick<
  User,
  "name" | "profile_img" | "following_cnt" | "follower_cnt"
>;

interface Props {
  user: ProfileCardUser;
}

export function ProfileCard({ user }: Props) {
  console.log(user.profile_img);
  return (
    <View className="bg-blue-800 rounded-2xl px-5 py-6 mb-3 mx-4 flex-row items-center">
      {user.profile_img === null ? (
        <Image
          source={require("../../../assets/images/mansun.png")}
          className="w-24 h-24 rounded-full mr-4 bg-white"
          resizeMode="contain"
        />
      ) : (
        <Image
          source={{
            uri: user.profile_img,
          }}
          className="w-24 h-24 rounded-full mr-4 bg-white"
          resizeMode="center"
        />
      )}

      <View>
        <View className="flex-row items-center gap-1">
          <Text className="text-white text-xl font-bold">{user.name}</Text>
        </View>
        <Text className="text-white text-base mt-1">
          팔로잉 {user.following_cnt}명 / 팔로워 {user.follower_cnt}명
        </Text>
      </View>
    </View>
  );
}
