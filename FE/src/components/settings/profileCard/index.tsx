import { Image, Text, TouchableOpacity, View } from "react-native";
import DefaultImage from "../../../assets/images/image_default.svg";
import { Pencil } from "lucide-react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SettingsStackParams } from "../../../navigation/types";
import { useNavigation } from "@react-navigation/native";

interface ProfileCardProps {
  edit?: boolean;
  nickname: string;
  profileImg: string;
  boardCount: number;
  followingCount: number;
  followerCount: number;
}

interface ProfileCardNavigationProps
  extends NativeStackNavigationProp<SettingsStackParams, "Mypage"> {}

export default function ProfileCard({
  edit,
  nickname,
  profileImg,
  boardCount,
  followingCount,
  followerCount,
}: ProfileCardProps) {
  const navigation = useNavigation<ProfileCardNavigationProps>();

  return (
    <View className="p-5 self-center gap-2 items-center">
      {/* 프로필 이미지 */}
      {profileImg ? (
        <Image
          source={{
            uri: profileImg,
          }}
          className="w-[80px] h-[80px] rounded-full"
          resizeMode="center"
        />
      ) : (
        <View
          style={{
            borderRadius: 999,
            overflow: "hidden",
          }}
        >
          <DefaultImage width={80} height={80} />
        </View>
      )}

      {/* 닉네임 */}
      <View className="flex-row items-center gap-1">
        <Text className="pl-5 text-blue-800 text-lg font-extrabold">
          {nickname}
        </Text>
        {edit && (
          <TouchableOpacity
            onPress={() => navigation.navigate("MyInformation")}
          >
            <Pencil color="#A3A3A3" size={14} />
          </TouchableOpacity>
        )}
      </View>

      {/* 게시글, 팔로잉, 팔로우 */}
      <View className="flex-row items-center gap-5">
        {/* 게시글 수 */}
        <View className="items-center">
          <Text className="text-neutral-600 text-sm">게시글</Text>
          <Text className="text-blue-800 font-bold">{boardCount}개</Text>
        </View>

        {/* 구분선 */}
        <View className="w-px h-5 bg-neutral-200" />

        {/* 팔로잉 */}
        <View className="items-center">
          <Text className="text-neutral-600 text-sm">팔로잉</Text>
          <Text className="text-blue-800 font-bold">{followingCount}명</Text>
        </View>

        {/* 구분선 */}
        <View className="w-px h-5 bg-neutral-200" />

        {/* 팔로우 */}
        <View className="items-center">
          <Text className="text-neutral-600 text-sm">팔로우</Text>
          <Text className="text-blue-800 font-bold">{followerCount}명</Text>
        </View>
      </View>
    </View>
  );
}
