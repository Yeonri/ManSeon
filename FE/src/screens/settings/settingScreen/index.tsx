import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetMyInfo } from "../../../api/quries/useMyinfo";
import { HeaderLogo } from "../../../components/common/headerLogo";
import { NoticeList } from "../../../components/setting/notice";
import { ProfileCard } from "../../../components/setting/profile";
import { SettingStackParams } from "../../../navigation/types";
import { useUserStore } from "../../../store/userStore";

interface SettingScreenNavigationProps
  extends NativeStackNavigationProp<SettingStackParams> {}

export function SettingScreen() {
  const navigation = useNavigation<SettingScreenNavigationProps>();

  const { data: user } = useGetMyInfo();

  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  return (
    <SafeAreaView className="flex-1" edges={["top"]}>
      <HeaderLogo />
      <ScrollView className="gap-y-2 px-3 pt-4">
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          {user && (
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              <ProfileCard user={user} />
            </TouchableOpacity>
          )}
        </TouchableOpacity>

        <View className="flex-row gap-6 mb-3 mt-3 justify-center">
          <TouchableOpacity
            onPress={() => navigation.navigate("MyPosts")}
            className="w-20 items-center"
          >
            <Image
              source={require("../../../assets/images/icon_mypost.png")}
              className="w-12 h-12 mb-2"
              resizeMode="center"
            />
            <Text className="text-base font-semibold text-neutral-800">
              내 게시글
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Prohibited")}
            className="w-20 items-center"
          >
            <Image
              source={require("../../../assets/images/icon_prohibited.png")}
              className="w-12 h-12 mb-2"
              resizeMode="contain"
            />
            <Text className="text-base font-semibold text-neutral-800">
              금어기
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Rule")}
            className="w-20 items-center"
          >
            <Image
              source={require("../../../assets/images/icon_rule.png")}
              className="w-12 h-12 mb-2"
              resizeMode="contain"
            />
            <Text className="text-base font-semibold text-neutral-800">
              방생 기준
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Tutorial")}
            className="w-20 items-center"
          >
            <Image
              source={require("../../../assets/images/icon_tutorial.png")}
              className="w-12 h-12 mb-2"
              resizeMode="contain"
            />
            <Text className="text-base font-semibold text-neutral-800">
              튜토리얼
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row mb-3 gap-9">
          <TouchableOpacity
            onPress={() => navigation.navigate("Fishings")}
            className="flex-row items-center px-4 py-3 w-5/12"
          >
            <Image
              source={require("../../../assets/images/icon_record.png")}
              className="w-12 h-12 mr-3"
              resizeMode="contain"
            />
            <View>
              <Text className="text-base font-semibold text-neutral-800">
                낚시 기록
              </Text>
              <Text className="text-xs text-neutral-400">
                기록을 확인해보세요
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("CollectionList")}
            className="flex-row items-center px-4 py-3 w-5/12"
          >
            <Image
              source={require("../../../assets/images/icon_collection.png")}
              className="w-12 h-12 mr-3"
              resizeMode="contain"
            />
            <View>
              <Text className="text-base font-semibold text-black">도감</Text>
              <Text className="text-xs text-neutral-400">
                한눈에 보는 도감 정보
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <NoticeList />

        <TouchableOpacity
          onPress={() => navigation.navigate("Suggestions")}
          className="bg-neutral-100 rounded-xl px-4 py-3 mx-3 mt-4 flex-row items-center mb-10 jus"
        >
          <Image
            source={require("../../../assets/images/icon_suggestion.png")}
            className="w-20 h-20 mr-4"
            resizeMode="contain"
          />
          <View>
            <Text className="font-bold text-base text-black mb-1">
              문의사항
            </Text>
            <Text className="text-sm text-neutral-500">
              만선에 의견이 있다면 남겨주세요.
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
