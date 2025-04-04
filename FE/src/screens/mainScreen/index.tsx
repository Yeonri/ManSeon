import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { Award, ChevronRight } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetMyInfo } from "../../api/quries/useMyinfo";
import { MainStackParams } from "../../api/types/MainStackParams";
import { HeaderLogo } from "../../components/common/headerLogo";
import { PermissionCheck } from "../../components/common/permissionCheck";
import { SearchInput } from "../../components/common/searchInput";
import { SearchModal } from "../../components/common/searchModal";
import { BookmarkButton } from "../../components/main/bookmarkButton";
import { FishingDonutChart } from "../../components/main/fishingDonutChart";
import { FishingPointCard } from "../../components/main/fishingPointCard";
import { FishingResult } from "../../components/main/fishingResult";
import moonList from "../../data/moonList";
import { useLocationPermission } from "../../hooks/useLocationPermission";
import PostData from "../../mocks/postsMocks.json";
import todayFishingPoint from "../../mocks/todayFishingPoint.json";
import { useUserStore } from "../../store/userStore";

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

  const setUser = useUserStore((state) => state.setUser);

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

  const progress = (user.collection_cnt / 24) * 100;

  const posts = PostData;

  return (
    <SafeAreaView className="flex-1">
      <HeaderLogo />
      <ScrollView className="px-5">
        {/* 물때 관련 */}
        <View>
          <View className="flex-row gap-3 items-end mt-5">
            <Text>오늘의 물때</Text>
            <Image source={moon!.img} className="h-5 w-5" />
          </View>
          <View className="flex-row items-center mt-2 gap-2">
            <Text className="font-bold text-2xl">
              {month}.{day}
            </Text>
            {/*음력 날짜는 수정 예정*/}
            <Text>
              (음력 {month}.{day})
            </Text>
          </View>
        </View>

        {/* 검색 관련 */}
        <View className="flex h-40 bg-blue-500 rounded-2xl mt-5 mb-5">
          {/* 안내멘트 */}
          <View className="flex-row items-baseline gap-1 ml-1">
            <Text className="text-white font-bold ml-3 mt-3 text-xl">
              {user.name}
            </Text>
            <Text className="text-white">
              님 오늘의 도착지를 확인해 보세요!
            </Text>
          </View>

          {/*검색창*/}
          <View className="mt-3 ml-3">
            <SearchInput
              value={keyword}
              onChangeText={setKeyword}
              onSearchPress={handleSEarch}
            />
          </View>

          {/* 버튼 3개 */}
          <View className="flex-row self-center gap-5 mx-3">
            <BookmarkButton name="북마크1" />
            <BookmarkButton name="북마크2" />
            <BookmarkButton name="북마크3" />
          </View>
        </View>

        {/* 통계 및 수집 내용 관련 */}
        <View className="border border-neutral-200 rounded-2xl gap-2 p-3 mb-5">
          {/* 통계 관련 */}
          <View>
            <Text className="text-neutral-600 font-bold text-xl">
              내가 잡은 물고기
            </Text>
            {user.fishing_total === 0 ? (
              <View className="flex-row justify-center">
                <View className="text-center justify-center">
                  <Text className="text-center font-semibold text-2xl">
                    아직 잡은
                  </Text>
                  <Text className="font-semibold text-2xl">
                    물고기가 없어요!
                  </Text>
                </View>
                <Image
                  source={require("../../assets/images/mansun.png")}
                  className="h-44 w-44"
                  resizeMode="contain"
                />
              </View>
            ) : (
              <View className="flex-row">
                {/* 차트 */}
                <FishingDonutChart
                  fishingList={user.fishing_list}
                  totalCount={user.fishing_total}
                />
                {/* 정보 */}
                <View className="justify-center">
                  <FishingResult
                    fishingResultList={user.fishing_list}
                    totalCount={user.fishing_total}
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
                {user.collection_cnt}
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

          {/* 활동 배지*/}
          <View>
            <TouchableOpacity
              className="flex-row items-center -mb-3"
              onPress={() => navigation.navigate("Profile")}
            >
              <Text className="text-neutral-600 font-bold text-xl">
                활동 배지
              </Text>
              <ChevronRight color="#525252" width={24} />
            </TouchableOpacity>
            <View className="flex-row justify-end mx-5 items-baseline">
              <Text className="text-blue-500 font-bold text-4xl">
                {user.badges_cnt}
              </Text>
              <Text className="text-neutral-400 font-bold text-xl"> / 9</Text>
            </View>

            <ScrollView horizontal className="mt-3">
              <View className="flex-row gap-x-3 px-1">
                {Array.from({ length: 9 }).map((_, index) => {
                  const isBlue = index < user.badges_cnt;
                  const bgColor = isBlue ? "bg-blue-100" : "bg-neutral-200";
                  const iconColor = isBlue ? "#284AAA" : "#616161";

                  return (
                    <View
                      key={index}
                      className={`${bgColor} w-16 h-16 items-center justify-center rounded-full`}
                    >
                      <Award width={48} color={iconColor} strokeWidth={3} />
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          </View>
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
        <View className="border border-neutral-200 rounded-2xl gap-2 p-3 mb-10">
          <View className="flex-row justify-between">
            <Text className="text-neutral-600 font-bold text-xl">커뮤니티</Text>

            <TouchableOpacity className="flex-row items-center">
              <Text className="text-neutral-400 text-xl font-medium">
                더 보기
              </Text>
              <ChevronRight color="#a3a3a3" width={24} />
            </TouchableOpacity>
          </View>
          <ScrollView horizontal className="mt-2">
            <View className="flex-row gap-x-3 px-1">
              {posts.slice(0, 10).map((post) => (
                <Image
                  key={post.postId}
                  source={{ uri: post.postImg }}
                  className="w-24 h-24 rounded-md"
                />
              ))}
            </View>
          </ScrollView>
        </View>
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
