import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { SettingsStackParams } from "../../../navigation/types";
import { useNavigation } from "@react-navigation/native";
import Header from "../../../components/common/header";
import DefaultImage from "../../../assets/images/image_default.svg";
import { ChevronRight, Ellipsis } from "lucide-react-native";

interface SettingsScreenNavigationProps
  extends NativeStackNavigationProp<SettingsStackParams> {}

export default function SettingsScreen() {
  const navigation = useNavigation<SettingsScreenNavigationProps>();

  // 임시 데이터
  const user = {
    nickname: "만선이",
    profileImg: "",
    followingCount: 123,
    followerCount: 50,
  };

  // 임시 데이터
  const noticeData = [
    {
      noticeId: 1,
      title: "[알림] 공식 유튜브 채널 개설",
      content:
        "공식 유튜브 채널을 개설했습니다. 구독, 좋아요, 알림 설정까지 부탁드려요.",
    },
    {
      noticeId: 2,
      title: "[장애복구] 지도 오류 안내",
      content:
        "지도 서비스에 발생하였던 오류를 수정하였습니다. 오랜 시간 기다려주셔서 감사합니다!",
    },
    {
      noticeId: 3,
      title: "[업데이트] 2.0.23 업데이트 안내",
      content:
        "안녕하세요. 많은 분들의 의견을 반영하여 업데이트를 진행하였습니다. 업데이트 사항은 다음과 같습니다.",
    },
  ];

  return (
    <SafeAreaView className="flex-1" edges={["top"]}>
      <Header logo={true} before={false} />
      <ScrollView>
        <View className="mx-5 gap-3">
          {/* 유저 프로필 */}
          <View className="p-5 flex-row bg-blue-800 rounded-xl items-center gap-3">
            {/* 프로필 이미지 */}
            {user.profileImg ? (
              <Image
                source={{
                  uri: user.profileImg,
                }}
                className="w-[70px] h-[70px] rounded-full"
                resizeMode="center"
              />
            ) : (
              <View
                style={{
                  borderRadius: 999,
                  overflow: "hidden",
                }}
              >
                <DefaultImage width={70} height={70} />
              </View>
            )}
            <View className="gap-1">
              <TouchableOpacity
                onPress={() => navigation.navigate("Mypage")}
                className="flex-row items-center"
              >
                <Text className="text-white text-xl font-bold">
                  {user.nickname}
                </Text>
                <ChevronRight color={"#FFFFFF"} size={25} />
              </TouchableOpacity>

              <Text className="text-white text-sm">
                팔로잉 {user.followingCount}명 / 팔로워 {user.followerCount}명
              </Text>
            </View>
          </View>

          {/* 버튼 */}
          <View className="p-5 rounded-xl gap-10">
            <View className="flex-row justify-between">
              {/* 내 게시글 버튼 */}
              <TouchableOpacity onPress={() => navigation.navigate("MyBoard")}>
                <View className="w-20 gap-3 items-center">
                  <Image
                    source={require("../../../assets/images/icon_mypost.png")}
                    className="w-10 h-10"
                    resizeMode="center"
                  />
                  <Text className="text-neutral-800 text-sm font-semibold">
                    내 게시글
                  </Text>
                </View>
              </TouchableOpacity>

              {/* 금어기 버튼 */}
              <TouchableOpacity
                onPress={() => navigation.navigate("Prohibited")}
              >
                <View className="w-20 gap-3 items-center">
                  <Image
                    source={require("../../../assets/images/icon_prohibited.png")}
                    className="w-10 h-10"
                    resizeMode="center"
                  />
                  <Text className="text-neutral-800 text-sm font-semibold">
                    금어기
                  </Text>
                </View>
              </TouchableOpacity>

              {/* 방생 기준 버튼 */}
              <TouchableOpacity
                onPress={() => navigation.navigate("FishingRule")}
              >
                <View className="w-20 gap-3 items-center">
                  <Image
                    source={require("../../../assets/images/icon_rule.png")}
                    className="w-10 h-10"
                    resizeMode="center"
                  />
                  <Text className="text-neutral-800 text-sm font-semibold">
                    방생 기준
                  </Text>
                </View>
              </TouchableOpacity>

              {/* 튜토리얼 버튼 */}
              <TouchableOpacity onPress={() => navigation.navigate("Tutorial")}>
                <View className="w-20 gap-3 items-center">
                  <Image
                    source={require("../../../assets/images/icon_tutorial.png")}
                    className="w-10 h-10"
                    resizeMode="center"
                  />
                  <Text className="text-neutral-800 text-sm font-semibold">
                    튜토리얼
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View className="flex-row justify-between">
              {/* 낚시 기록 버튼 */}
              <TouchableOpacity onPress={() => navigation.navigate("Record")}>
                <View className="w-35 flex-row gap-3 items-center">
                  <Image
                    source={require("../../../assets/images/icon_record.png")}
                    className="w-10 h-10"
                    resizeMode="center"
                  />
                  <View className="gap-1">
                    <Text className="text-neutral-800 text-sm font-semibold">
                      낚시 기록
                    </Text>
                    <Text className="text-neutral-400 text-xs">
                      기록을 확인해보세요
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              {/* 도감 버튼 */}
              <TouchableOpacity
                onPress={() => navigation.navigate("Collection")}
              >
                <View className="w-35 flex-row gap-3 items-center">
                  <Image
                    source={require("../../../assets/images/icon_collection.png")}
                    className="w-10 h-10"
                    resizeMode="center"
                  />
                  <View className="gap-1">
                    <Text className="text-neutral-800 text-sm font-semibold">
                      도감
                    </Text>
                    <Text className="text-neutral-400 text-xs">
                      한눈에 보는 도감 정보
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* 공지사항 */}
          {/* <TouchableOpacity
            onPress={() => navigation.navigate("Notice")}
            className="p-5 bg-neutral-50 rounded-xl gap-3"
          > */}
          <View className="p-5 bg-neutral-50 rounded-xl gap-3">
            <View className="flex-row justify-between">
              <Text className="text-neutral-800 font-semibold">공지사항</Text>
              <Ellipsis color="#A3A3A3" width={18} />
            </View>
            {noticeData.slice(0, 3).map((notice) => {
              return (
                <View key={notice.noticeId} className="gap-1">
                  <View className="flex-row items-center gap-1">
                    <Image
                      source={require("../../../assets/images/icon_notice.png")}
                      className="w-5 h-5"
                      resizeMode="center"
                    />
                    <Text className="text-neutral-600 text-sm font-semibold">
                      {notice.title}
                    </Text>
                  </View>
                  <Text className="text-neutral-600 text-sm">
                    {notice.content.length > 29
                      ? notice.content.slice(0, 29) + "..."
                      : notice.content}
                  </Text>
                </View>
              );
            })}
          </View>
          {/* </TouchableOpacity> */}

          <TouchableOpacity
            onPress={() => navigation.navigate("Inquiry")}
            className="p-3 bg-blue-50 rounded-xl flex-row items-center"
          >
            <Image
              source={require("../../../assets/images/icon_suggestion.png")}
              className="w-20 h-20 mr-4"
              resizeMode="contain"
            />
            <View className="gap-1">
              <Text className="text-neutral-800 font-bold">문의사항</Text>
              <Text className="text-neutral-600 text-sm">
                만선에 의견이 있다면 남겨주세요.
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
