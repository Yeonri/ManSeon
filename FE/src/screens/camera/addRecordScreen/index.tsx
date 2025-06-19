import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Alert, Image, PermissionsAndroid, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { RootStackParams } from "../../../navigation/types";
import { useEffect, useState } from "react";
import Geolocation from "react-native-geolocation-service";
import Header from "../../../components/common/header";
import CustomButton from "../../../components/common/customButton";
import SelectButton from "../../../components/common/selectButton";
import SelectNumber from "../../../components/camera/selectNumber";

type Status = "공개" | "비공개";
type Bait = "지렁이" | "새우" | "게" | "루어";
type Method = "낚싯대" | "맨손" | "뜰채";

export default function AddRecordScreen() {
  const route = useRoute<RouteProp<RootStackParams, "AddRecord">>();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const { photoUri, fishName } = route.params;

  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null); // 위도, 경도
  const [status, setStatus] = useState<Status>("공개"); // 장소 공개 여부
  const [selectedValue, setSelectedValue] = useState<number>(10); // 크기
  const [selectedBait, setSelectedBait] = useState<Bait>("지렁이"); // 미끼 정보
  const [selectedMethod, setSelectedMethod] = useState<Method>("낚싯대"); // 낚시 방법

  const [error, setError] = useState<string | null>(null);

  // 저장
  function handleSave() {
    if (!location) {
      Alert.alert("위치 정보 오류", "위치 정보를 불러올 수 없습니다.");
      return;
    }

    // [임시] useAddFishingRecord으로 대체 예정
    Alert.alert(
      "작성 완료",
      "낚시 기록이 저장되었습니다.",
      [
        {
          text: "확인",
          onPress: () => {
            navigation.navigate("BottomTab", {
              screen: "home",
            });
          },
        },
      ],
      { cancelable: false }
    );
  }

  // 사용자 현 위치 (위도, 경도)
  async function requestLocation() {
    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (!hasPermission) {
      console.warn("위치 권한 없음");
      setError("위치 권한이 없습니다.");
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setError(null);
        console.log("위도:", latitude, "경도:", longitude);
      },
      (error) => {
        console.error("위치 오류:", error.code, error.message);
        setError("위치 정보를 불러오는 데 실패했습니다.");
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
        forceRequestLocation: true,
        showLocationDialog: true,
      }
    );
  }

  useEffect(() => {
    requestLocation();
  }, []);

  return (
    <ScrollView className="flex-1">
      {/* 헤더 */}
      <Header logo={true} before={true} />

      <View className="mx-5 gap-5">
        {/* 촬영한 사진 */}
        <Image
          source={{ uri: "file://" + photoUri }}
          className="w-full h-[250px] rounded-xl"
        />
        {/* 자동 입력 정보 */}
        <View className="gap-3">
          <Text className="text-neutral-800 font-semibold">자동 입력 정보</Text>
          <View className="p-5 bg-neutral-100 rounded-xl gap-3">
            <Text className="text-neutral-600 font-extrabold">{fishName}</Text>
            {location ? (
              <View className="gap-1">
                <Text className="text-neutral-400 text-sm">
                  위도{"  "}
                  {location.latitude.toFixed(4)}
                </Text>
                <Text className="text-neutral-400 text-sm">
                  경도{"  "}
                  {location.longitude.toFixed(4)}
                </Text>
              </View>
            ) : (
              <Text className="text-neutral-400 text-sm">
                {error || "위치 정보를 불러오는 중..."}
              </Text>
            )}
          </View>
        </View>

        {/* 장소 공개 여부 */}
        <View className="flex-row items-center justify-between">
          <Text className="text-neutral-800 font-semibold">장소 공개 여부</Text>
          <View className="flex-row gap-1">
            {(["공개", "비공개"] as const).map((now) => (
              <SelectButton
                name={now}
                fill={status === now}
                onPress={() => setStatus(now)}
              />
            ))}
          </View>
        </View>

        {/* 크기 선택 */}
        <View className="flex-row items-start justify-between">
          <Text className="text-neutral-800 font-semibold">크기 선택</Text>
          <View className="flex-row items-end gap-2">
            <SelectNumber
              initial={selectedValue}
              onChange={(val) => setSelectedValue(val)}
            />
            <Text className="text-neutral-400 py-3 text-lg font-semibold">
              cm
            </Text>
          </View>
        </View>

        {/* 낚시 정보 */}
        <View className="gap-3">
          <Text className="text-neutral-800 font-semibold">낚시 정보</Text>
          <View className="p-5 bg-blue-50 rounded-xl gap-5">
            <View className="gap-3">
              <Text className="text-neutral-600 text-xs font-semibold">
                미끼 정보를 선택해주세요
              </Text>
              <View className="flex-row gap-2">
                {(["지렁이", "새우", "게", "루어"] as const).map((bait) => (
                  <SelectButton
                    name={bait}
                    fill={selectedBait === bait}
                    onPress={() => setSelectedBait(bait)}
                  />
                ))}
              </View>
            </View>
            <View className="gap-3">
              <Text className="text-neutral-600 text-xs font-semibold">
                낚시 방법을 선택해주세요
              </Text>
              <View className="flex-row gap-2">
                {(["낚싯대", "맨손", "뜰채"] as const).map((method) => (
                  <SelectButton
                    name={method}
                    fill={selectedMethod === method}
                    onPress={() => setSelectedMethod(method)}
                  />
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* 취소 / 저장 버튼 */}
        <View className="flex-row justify-center gap-5 mt-5">
          <CustomButton
            fill={false}
            full={false}
            title="취소"
            onPress={() => navigation.goBack()}
          />
          <CustomButton
            fill={true}
            full={false}
            title="저장"
            onPress={handleSave}
          />
        </View>
      </View>
      <View className="p-10" />
    </ScrollView>
  );
}
