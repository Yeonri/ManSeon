import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/common/header";
import TodayInformation from "../../../components/home/todayInformation";
import SearchInformation from "../../../components/home/searchInformation";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackParams } from "../../../navigation/types";
import { useNavigation } from "@react-navigation/native";
import { ChatbotButton } from "../../../components/home/chatbotButton";
import SearchModal from "../../../components/common/searchModal";
import Statistics from "../../../components/home/statistics";
import Collection from "../../../components/home/collection";
import RecommendFishingPoint from "../../../components/home/recommendFishingPoint";
import usePermission from "../../../hooks/usePermission";
import { PERMISSIONS } from "react-native-permissions";
import { useLocationStore } from "../../../store/locationStore";
import Geolocation from "react-native-geolocation-service";
import PermissionCheck from "../../../components/common/permissionCheck";
import Community from "../../../components/home/community";

interface HomeScreenNavigationProps
  extends NativeStackNavigationProp<HomeStackParams> {}

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProps>();

  const [keyword, setKeyword] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  const hasLocationPermission = usePermission(
    "위치",
    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
  );

  const setLocation = useLocationStore((state) => state.setLocation);

  // 위치 정보 가져오기
  useEffect(() => {
    if (hasLocationPermission) {
      Geolocation.getCurrentPosition(
        (position) => {
          console.log(
            "위도, 경도:",
            position.coords.latitude,
            position.coords.longitude
          );
          setLocation(position.coords.latitude, position.coords.longitude);
        },
        (error) => console.log("Error getting location:", error),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    }
  }, [hasLocationPermission, setLocation]);

  if (hasLocationPermission === null) {
    return <PermissionCheck name="위치" />;
  }

  return (
    <SafeAreaView edges={["top"]} className="flex-1">
      {/* 헤더 */}
      <Header logo={true} before={false} />

      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 32 }}>
        <View className="mx-5 gap-5">
          {/* 오늘의 물때 */}
          <TodayInformation />

          {/* 검색창 */}
          <SearchInformation
            keyword={keyword}
            setKeyword={setKeyword}
            handleSearch={() => setShowModal(true)}
          />

          {/* 챗봇 버튼 */}
          <ChatbotButton onPress={() => navigation.navigate("Chatbot")} />

          <View className="p-5 rounded-xl border border-neutral-100 gap-3">
            {/* 내가 잡은 물고기 */}
            <Statistics />
            <View className="w-full h-px bg-neutral-100 self-center my-2" />

            {/* 도감 */}
            <Collection />
          </View>

          {/* 추천 포인트 */}
          <RecommendFishingPoint />

          {/* 커뮤니티 */}
          <Community />
        </View>
      </ScrollView>

      {/* 검색 모달 */}
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
