import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { ChevronRight } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Geolocation from "react-native-geolocation-service";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMyFishes } from "../../api/quries/useMyFishes";
import { useGetMyInfo } from "../../api/quries/useMyinfo";
import { useGetLatestPost } from "../../api/quries/usePost";
import { HeaderLogo } from "../../components/common/headerLogo";
import { PermissionCheck } from "../../components/common/permissionCheck";
import { SearchInput } from "../../components/common/searchInput";
import { SearchModal } from "../../components/common/searchModal";
import { ChatbotButton } from "../../components/main/chatbotButton";
import { FishingDonutChart } from "../../components/main/fishingDonutChart";
import { FishingPointCard } from "../../components/main/fishingPointCard";
import { FishingResult } from "../../components/main/fishingResult";
import moonList from "../../data/moonList";
import { useLocationPermission } from "../../hooks/useLocationPermission";
import todayFishingPoint from "../../mocks/todayFishingPoint.json";
import { useLocationStore } from "../../store/locationStore";
import { useUserStore } from "../../store/userStore";
import { MainStackParams } from "../../types/MainStackParams";
import { countFishingData } from "../../utils/countFisingData";

dayjs.extend(utc);
dayjs.extend(timezone);

interface MainScreenNavigationProps
  extends NativeStackNavigationProp<MainStackParams> {}

export function MainScreen() {
  const hasLocationPermission = useLocationPermission();

  const [keyword, setKeyword] = useState("");

  const [showModal, setShowModal] = useState(false);

  const navigation = useNavigation<MainScreenNavigationProps>();

  const { data: user } = useGetMyInfo();
  console.log("유저정보 확인하기:", user);

  const { data: fishList } = useMyFishes();
  console.log("물고기 받아오기", fishList);

  const { data: latestPost } = useGetLatestPost();
  console.log("최신 게시글 받아오기", latestPost);

  const countingresult = countFishingData(fishList);

  const setUser = useUserStore((state) => state.setUser);
  const setLocation = useLocationStore((state) => state.setLocation);

  // 위치 정보 가져오기
  useEffect(() => {
    if (hasLocationPermission) {
      Geolocation.getCurrentPosition(
        (position) => {
          // console.log(
          //   "위도, 경도:",
          //   position.coords.latitude,
          //   position.coords.longitude
          // );
          setLocation(position.coords.latitude, position.coords.longitude);
        },
        (error) => console.log("Error getting location:", error),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    }
  }, [hasLocationPermission, setLocation]);

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  if (hasLocationPermission === null) {
    return <PermissionCheck name="위치" />;
  }

  if (!user) return null;

  const nowKST = dayjs().tz("Asia/Seoul");
  const day = nowKST.date();
  const month = nowKST.month() + 1;
  const moon = moonList.find((item) => item.day === day);

  const handleSEarch = () => {
    setShowModal(true);
  };

  const collectionCount = Object.values(
    user.fishCollections as Record<string, any[]>
  ).filter((arr) => arr.length > 0).length;

  const progress = (collectionCount / 24) * 100;

  return (
    <SafeAreaView edges={["top"]} className="flex-1">
      <HeaderLogo />
      <ScrollView className="px-5">
        {/* 물때 관련 */}
        <View className="flex-row justify-between items-center mr-10">
          <View>
            <View className="flex-row items-baseline mt-2 gap-2">
              <Text className="font-bold text-2xl">
                {month}월 {day}일
              </Text>
              {/*음력 날짜는 수정 예정*/}
              {/* <Text>
                (음력 {month}.{day})
              </Text> */}
              <Text>오늘의 물때</Text>
              <Image source={moon!.img} className="h-8 w-8" />
            </View>
          </View>
        </View>

        {/* 검색 관련 */}
        <View className="flex h-32 bg-blue-500 rounded-2xl mt-5 mb-5">
          {/* 안내멘트 */}
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-baseline gap-1 ml-1">
              <Text className="text-white font-bold ml-3 mt-3 text-xl">
                {user.nickname ? user.nickname : user.username}
              </Text>
              <Text className="text-white">
                님 오늘의 도착지를 확인해 보세요!
              </Text>
            </View>
          </View>

          {/*검색창*/}
          <View className="mt-5 ml-3">
            <SearchInput
              value={keyword}
              onChangeText={setKeyword}
              onSearchPress={handleSEarch}
            />
          </View>
        </View>

        {/* 챗봇 */}
        <ChatbotButton onPress={() => navigation.navigate("Chatbot")} />

        {/* 통계 및 수집 내용 관련 */}
        <View className="border border-neutral-200 rounded-2xl gap-2 p-3 mb-5">
          <View>
            <Text className="text-neutral-600 font-bold text-xl">
              내가 잡은 물고기
            </Text>
            {collectionCount === 0 ? (
              <View className="flex-row justify-center mt-3">
                <Image
                  source={require("../../assets/images/chatbot2.png")}
                  className="h-44 w-44 -ml-5"
                  resizeMode="contain"
                />
                <View className="text-center justify-center">
                  <Text className="text-center font-semibold text-2xl">
                    아직 잡은
                  </Text>
                  <Text className="font-semibold text-2xl">
                    물고기가 없어요!
                  </Text>
                </View>
              </View>
            ) : (
              <View className="flex-row">
                <FishingDonutChart
                  fishingList={countingresult.fishing_list}
                  totalCount={countingresult.fishing_total}
                />

                <View className="justify-center">
                  <FishingResult
                    fishingResultList={countingresult.fishing_list}
                    totalCount={countingresult.fishing_total}
                  />
                </View>
              </View>
            )}
          </View>

          <View className="w-[90%] h-px bg-neutral-100 self-center my-2" />

          {/* 도감 */}
          <View>
            <TouchableOpacity
              className="flex-row items-center -mb-3"
              onPress={() => navigation.navigate("CollectionList")}
            >
              <Text className="text-neutral-600 font-bold text-xl">도감</Text>
              <ChevronRight color="#525252" width={24} />
            </TouchableOpacity>

            <View className="flex-row justify-end mx-5 items-baseline">
              <Text className="text-blue-500 font-bold text-4xl">
                {collectionCount}
              </Text>
              <Text className="text-neutral-400 font-bold text-xl"> / 24</Text>
            </View>

            <View className="h-4 bg-blue-50 rounded-full mt-2 overflow-hidden w-[95%] self-center">
              <View
                className="h-full bg-blue-600 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </View>
          </View>

          <View className="w-[90%] h-px bg-neutral-100 self-center my-2" />
        </View>

        {/* 오늘의 추천 포인트 */}
        <View className="border border-neutral-200 rounded-2xl gap-2 p-3 mb-5">
          <View className="flex-row justify-between">
            <Text className="text-neutral-600 font-bold text-xl">
              오늘의 추천 포인트
            </Text>

            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => navigation.navigate("Map")}
            >
              <Text className="text-neutral-400 text-xl font-medium">
                더 보기
              </Text>
              <ChevronRight color="#a3a3a3" width={24} />
            </TouchableOpacity>
          </View>

          <ScrollView horizontal className="mt-2">
            <View className="flex-row gap-x-3 px-1">
              {todayFishingPoint.map((point) => (
                <FishingPointCard
                  key={point.pointId}
                  name={point.name}
                  latitude={point.latitude}
                  longitude={point.longitude}
                />
              ))}
            </View>
          </ScrollView>
        </View>

        {/* 커뮤니티 */}
        {/* <View className="border border-neutral-200 rounded-2xl gap-2 p-3 mb-10">
          <View className="flex-row justify-between">
            <Text className="text-neutral-600 font-bold text-xl">커뮤니티</Text>

            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => navigation.navigate("Community")}
            >
              <Text className="text-neutral-400 text-xl font-medium">
                더 보기
              </Text>
              <ChevronRight color="#a3a3a3" width={24} />
            </TouchableOpacity>
          </View>
          <ScrollView horizontal className="mt-2">
            <View className="flex-row gap-x-3 px-1">
              {latestPost.slice(0, 10).map((board) => (
                <Image
                  key={board.boardId}
                  source={{ uri: board.postImg }}
                  className="w-24 h-24 rounded-md"
                />
              ))}
            </View>
          </ScrollView>
        </View> */}
      </ScrollView>

      <SearchModal
        visible={showModal}
        keyword={keyword}
        onChangeText={setKeyword}
        onSearch={() => {}}
        onClose={() => {
          setShowModal(false);
        }}
      />
    </SafeAreaView>
  );
}
