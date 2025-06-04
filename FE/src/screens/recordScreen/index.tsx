import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  PermissionsAndroid,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Geolocation from "react-native-geolocation-service";
import { SelectNumber } from "../../components/cameraRecord/selectNumber";
import { HeaderLogo } from "../../components/common/headerLogo";
import { SelectTag } from "../../components/common/selectTag";
// import { Toggle } from "../../components/cameraRecord/toggle";
import { HalfButton } from "../../components/common/halfButton";
import { AppStackParams } from "../../navigation/types";
// import { useAddRecord } from "../../api/quries/useRecord";

type Bait = "지렁이" | "새우" | "게" | "루어";
type Method = "낚싯대" | "맨손" | "뜰채";

export function RecordScreen() {
  const route = useRoute<RouteProp<AppStackParams, "Record">>();
  const navigation = useNavigation<NavigationProp<AppStackParams>>();
  const { photoUri, fishName } = route.params;
  const [selectedValue, setSelectedValue] = useState(10);
  // const [visibility, setVisibility] = useState<"공개" | "비공개">("공개");
  const [selectedBait, setSelectedBait] = useState<Bait | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<Method | null>(null);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  // const { mutate: addRecord } = useAddRecord();

  function handleSave() {
    if (!location) {
      Alert.alert("위치 정보 없음", "위치 정보를 불러올 수 없습니다.");
      return;
    }
    if (!selectedBait || !selectedMethod) {
      Alert.alert("입력 누락", "미끼와 낚시 방법을 모두 선택해주세요.");
      return;
    }
    Alert.alert(
      "작성 완료",
      "낚시 기록이 저장되었습니다!",
      [
        {
          text: "확인",
          onPress: () => {
            navigation.navigate("BottomTab", {
              screen: "home",
              params: {
                screen: "Fishing",
              },
            });
          },
        },
      ],
      { cancelable: false }
    );
  }

  // const baitMap = { 지렁이: 0, 새우: 1, 게: 2, 루어: 3 } as const;
  // const methodMap = { 낚싯대: 0, 맨손: 1, 뜰채: 2 } as const;

  // const bait = baitMap[selectedBait] as 0 | 1 | 2 | 3;
  // const method = methodMap[selectedMethod] as 0 | 1 | 2;

  // const payload = {
  //   fishName: fishName,
  //   lat: location.latitude,
  //   lng: location.longitude,
  //   size: selectedValue,
  //   bait: selectedBait,
  //   equipment: selectedMethod,
  //   fishImg: photoUri,
  // };

  // addRecord(payload, {
  //   onSuccess: () => {
  //     console.log("낚시 기록 추가 성공");
  //     navigation.navigate("BottomTabs", {
  //       screen: "home",
  //       params: {
  //         screen: "Fishing",
  //       },
  //     });
  //   },
  // onError: () => {
  // console.log("낚시 기록 추가 실패");
  // Alert.alert("낚시 기록 추가 실패", "잠시 후 다시 시도해주세요.");
  // },
  // });
  // }

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
        {/* <View className="flex-row items-center justify-between">
          <Text className="font-semibold text-lg text-neutral-600">
            장소 공개 여부
          </Text>
          <Toggle selected={visibility} onSelect={setVisibility} />
        </View> */}
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
                {(["지렁이", "새우", "게", "루어"] as const).map((bait) => (
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
                {(["낚싯대", "맨손", "뜰채"] as const).map((method) => (
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
          <HalfButton title="저장" type="default" onPress={handleSave} />
        </View>
        {/* 이전/저장 버튼*/}
      </View>
      <View className="p-10" />
    </ScrollView>
  );
}
