import { useNavigation } from "@react-navigation/native";
import { PencilLine } from "lucide-react-native";
import { useState } from "react";
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { HalfButton } from "../../components/common/halfButton";
import { HeaderBeforeLogo } from "../../components/common/headerBeforeLogo";
import { safeUpdateUserInfo } from "../../components/more/profileEdit";
import { useUserStore } from "../../store/userStore";
import selectImage from "../../utils/selectImage";

export function ProfileEditScreen() {
  const navigation = useNavigation();
  const user = useUserStore((state) => state.user);

  // const [isSecure1, setIsSecure1] = useState(true);
  // const [isSecure2, setIsSecure2] = useState(true);

  const [editingNickname, setEditingNickname] = useState(false);
  const [nickname, setNickname] = useState(user?.nickname);

  const [email, setEmail] = useState(user?.email);
  const [name, setName] = useState(user?.username);
  const [phone, setPhone] = useState(user?.phoneNum);
  const [profileImg, setProfileImg] = useState(user?.profileImg || "");
  // const [password, setPassword] = useState("");

  const [profileImage, setProfileImage] = useState<{
    uri: string;
    name: string;
    type: string;
  } | null>(null);

  const handleSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
      },
      (response) => {
        if (
          response.didCancel ||
          !response.assets ||
          response.assets.length === 0
        )
          return;

        const asset = response.assets[0];
        if (asset.uri && asset.fileName && asset.type) {
          setProfileImage({
            uri: asset.uri,
            name: asset.fileName,
            type: asset.type,
          });
        }
      }
    );
  };

  async function handleSave() {
    const { success, error } = await safeUpdateUserInfo({
      name,
      phoneNum: phone,
      nickname,
      profileImg,
    });

    if (success) {
      navigation.goBack();
    } else {
      console.error("유저 정보 수정 실패", error);
      Alert.alert("오류", "유저 정보 수정 중 문제가 발생했습니다.");
    }
  }

  // 이미지 삭제
  function handleImageDelete() {
    Alert.alert("사진 삭제", "사진을 삭제하시겠습니까?", [
      { text: "취소", style: "cancel" },
      {
        text: "삭제",
        style: "destructive",
        onPress: () => setProfileImg(""),
      },
    ]);
  }

  // 이미지 선택
  function handleImageSelect() {
    if (!editingNickname) return;
    selectImage((uri) => {
      setProfileImg(uri);
    });
  }

  if (!user) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text>유저 정보를 불러오는 중입니다.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["top"]} className="flex-1">
      <HeaderBeforeLogo />
      <View className="bg-blue-50 flex-1 mx-5 my-5 rounded-2xl items-center">
        <TouchableOpacity
          onPress={profileImg ? handleImageDelete : handleImageSelect}
        >
          <Image
            source={
              profileImg
                ? { uri: profileImg }
                : require("../../assets/images/mansun.png")
            }
            className="w-24 h-24 my-6 rounded-full mt-16 bg-white"
            resizeMode={profileImg ? "cover" : "contain"}
          />
        </TouchableOpacity>
        <View className="flex-row items-center">
          {editingNickname ? (
            <TextInput
              value={nickname}
              onChangeText={setNickname}
              className="text-xl font-bold text-neutral-800 mr-1"
            />
          ) : (
            <Text className="text-xl font-bold text-neutral-800 mr-1">
              {nickname}
            </Text>
          )}
          <TouchableOpacity
            onPress={() => setEditingNickname(!editingNickname)}
          >
            <PencilLine color="#737373" width={24} />
          </TouchableOpacity>
        </View>

        <View className="flex w-full mt-16">
          <View className="flex w-full px-7 mb-3">
            <Text className="font-bold text-neutral-800">이메일</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              className="border-b-2 border-b-neutral-300 py-3 w-full"
            />
          </View>
          <View className="flex w-full px-7 mb-3">
            <Text className="font-bold text-neutral-800">이름</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              className="border-b-2 border-b-neutral-300 py-3 w-full"
            />
          </View>
          <View className="flex w-full px-7 mb-3">
            <Text className="font-bold text-neutral-800">전화번호</Text>
            <TextInput
              inputMode="tel"
              value={phone}
              onChangeText={setPhone}
              className="border-b-2 border-b-neutral-300 py-3 w-full"
            />
          </View>
        </View>
        <View className="flex-row justify-between w-full mt-12 px-5">
          <HalfButton
            title="취소"
            type="line"
            onPress={() => navigation.goBack()}
          />
          <HalfButton title="저장" type="default" onPress={handleSave} />
        </View>
      </View>
    </SafeAreaView>
  );
}
