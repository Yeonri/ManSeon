import {
  Image,
  PermissionsAndroid,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParams } from "../../api/types/RootStackParams";
import { HeaderLogo } from "../../components/common/headerLogo";
import Geolocation from "react-native-geolocation-service";
import { useEffect, useState } from "react";
import { SelectTag } from "../../components/common/selectTag";
import { SelectNumber } from "../../components/cameraRecord/selectNumber";
import { Toggle } from "../../components/cameraRecord/toggle";
import { HalfButton } from "../../components/common/halfButton";

export function RecordScreen() {
  const route = useRoute<RouteProp<RootStackParams, "Record">>();
  const navigation = useNavigation();
  const { photoUri, fishName } = route.params;
  const [selectedValue, setSelectedValue] = useState(10);
  const [visibility, setVisibility] = useState<"공개" | "비공개">("공개");
  const [selectedBait, setSelectedBait] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const requestLocation = async () => {
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
  };

  useEffect(() => {
    requestLocation();
  }, []);

  return (
    <ScrollView className="flex-1">
      <HeaderLogo />
      <View className="gap-7 mx-5">
        <View className="items-center">
          <Image
            source={{ uri: "file://" + photoUri }}
            className="w-full h-[250px] rounded-xl"
          />
        </View>
        <View className="gap-2">
          <Text className="font-semibold text-lg text-neutral-600">
            자동 입력 정보
          </Text>
          <View className="bg-neutral-100 rounded-lg p-5 gap-1">
            <Text className="text-xl font-semibold text-neutral-500">
              {fishName}
            </Text>
            {location ? (
              <>
                <View className="flex-row gap-2">
                  <Text className="text-neutral-600">위도</Text>
                  <Text className="text-neutral-400">
                    {location.latitude.toFixed(4)}
                  </Text>
                </View>
                <View className="flex-row gap-2">
                  <Text className="text-neutral-600">경도</Text>
                  <Text className="text-neutral-400">
                    {location.longitude.toFixed(4)}
                  </Text>
                </View>
              </>
            ) : (
              <Text className="text-neutral-400">
                {error || "위치 정보를 불러오는 중..."}
              </Text>
            )}
          </View>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="font-semibold text-lg text-neutral-600">
            장소 공개 여부
          </Text>
          <Toggle selected={visibility} onSelect={setVisibility} />
        </View>
        <View className="flex-row items-start justify-between">
          <Text className="font-semibold text-lg text-neutral-600">
            크기 선택
          </Text>
          <View className="flex-row items-end">
            <SelectNumber
              initial={selectedValue}
              onChange={(val) => setSelectedValue(val)}
            />
            <Text className="text-xl font-semibold p-2">cm</Text>
          </View>
        </View>
        <View className="gap-2">
          <Text className="font-semibold text-lg text-neutral-600">
            낚시 정보
          </Text>
          <View className="bg-blue-50 rounded-lg p-5 gap-5">
            <View className="gap-2">
              <Text className="font-semibold text-neutral-500">
                미끼 정보를 선택해주세요
              </Text>
              <View className="flex-row gap-2">
                {["지렁이", "새우", "게", "루어"].map((bait) => (
                  <TouchableOpacity
                    key={bait}
                    onPress={() => setSelectedBait(bait)}
                  >
                    <SelectTag name={bait} fill={selectedBait === bait} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View className="gap-2">
              <Text className="font-semibold text-neutral-500">
                낚시 방법을 선택해주세요
              </Text>
              <View className="flex-row gap-2">
                {["낚싯대", "맨손", "뜰채"].map((method) => (
                  <TouchableOpacity
                    key={method}
                    onPress={() => setSelectedMethod(method)}
                  >
                    <SelectTag name={method} fill={selectedMethod === method} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </View>
        <View className="flex-row justify-center gap-5 mt-5">
          <HalfButton
            title="취소"
            type="line"
            onPress={() => navigation.goBack()}
          />
          <HalfButton title="저장" type="default" onPress={() => {}} />
        </View>
        {/* 이전/저장 버튼*/}
      </View>
      <View className="p-10" />
    </ScrollView>
  );
}
