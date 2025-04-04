import { Image, ScrollView, Text, View } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParams } from "../../api/types/RootStackParams";
import { HeaderLogo } from "../../components/common/headerLogo";

export function RecordScreen() {
  const route = useRoute<RouteProp<RootStackParams, "Record">>();
  const { photoUri, fishName } = route.params;

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
        <View>
          <Text className="font-semibold text-lg">자동 입력 정보</Text>
          <View className="bg-neutral-100 rounded-lg p-5">
            <Text className="text-xl font-semibold text-neutral-500">
              {fishName}
            </Text>
            <Text className="text-neutral-500">위도</Text>
            <Text className="text-neutral-500">경도</Text>
          </View>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="font-semibold text-lg">장소 공개 여부</Text>
          <Text className="text-lg">공개/비공개 버튼</Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="font-semibold text-lg">크기 선택</Text>
          <Text className="text-lg">cm</Text>
        </View>
        <View>
          <Text className="font-semibold text-lg">낚시 정보</Text>
          <View className="bg-blue-50 rounded-lg p-5 gap-5">
            <View>
              <Text className="font-semibold text-neutral-500">
                미끼 정보를 선택해주세요
              </Text>
              <Text>지렁이/새우/게/루어</Text>
            </View>
            <View>
              <Text className="font-semibold text-neutral-500">
                낚시 방법을 선택해주세요
              </Text>
              <Text>낚싯대/맨손/뜰채</Text>
            </View>
          </View>
        </View>
        <Text>이전/저장 버튼</Text>
      </View>
    </ScrollView>
  );
}
