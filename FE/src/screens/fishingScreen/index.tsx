import { Image, ScrollView, Text, View } from "react-native";
import { HeaderBeforeTitle } from "../../components/common/headerBeforeTitle";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FishingStackParams } from "../../api/types/FishingStackParams";
import fishingRecordMocks from "../../mocks/fishingRecordMocks.json";
import { SelectTag } from "../../components/common/selectTag";

interface FishingScreenProps
  extends NativeStackScreenProps<FishingStackParams, "Fishing"> {}

export function FishingScreen({ route }: FishingScreenProps) {
  const { title, fishId } = route.params;

  return (
    <ScrollView className="flex-1">
      <HeaderBeforeTitle name={title} />
      <View className="gap-7 mx-5">
        <View className="items-center">
          <Image
            source={{ uri: fishingRecordMocks[fishId - 1].fishImg }}
            className="w-full h-[250px] rounded-xl"
          />
        </View>
        <View className="gap-2">
          <Text className="font-semibold text-lg">물고기 정보</Text>
          <View className="flex-row gap-3">
            <SelectTag
              name={fishingRecordMocks[fishId - 1].fishType}
              fill={true}
            />
            <SelectTag
              name={`${fishingRecordMocks[fishId - 1].size}cm`}
              fill={false}
            />
          </View>
        </View>
        <View className="gap-2">
          <Text className="font-semibold text-lg">환경 정보</Text>
          <View className="bg-neutral-100 rounded-lg p-5">
            <View className="flex-row gap-3">
              <Text className="text-neutral-500">시간</Text>
              <Text className="text-neutral-500">
                {fishingRecordMocks[fishId - 1].createAt}
              </Text>
            </View>
            <View className="flex-row gap-3">
              <Text className="text-neutral-500">물때</Text>
              <Text className="text-neutral-500">
                {fishingRecordMocks[fishId - 1].season}물 (서해{" "}
                {fishingRecordMocks[fishId - 1].season - 1}물)
              </Text>
            </View>
          </View>
        </View>
        <View className="gap-2">
          <Text className="font-semibold text-lg">위치 정보</Text>
          <View className="bg-neutral-100 rounded-lg p-5">
            <View className="flex-row gap-3">
              <Text className="text-neutral-500">위도</Text>
              <Text className="text-neutral-500">
                {fishingRecordMocks[fishId - 1].lat}
              </Text>
            </View>
            <View className="flex-row gap-3">
              <Text className="text-neutral-500">경도</Text>
              <Text className="text-neutral-500">
                {fishingRecordMocks[fishId - 1].lng}
              </Text>
            </View>
          </View>
        </View>
        <View className="gap-2">
          <Text className="font-semibold text-lg">미끼 정보</Text>
          <View className="flex-row gap-3">
            <SelectTag
              name="지렁이"
              fill={fishingRecordMocks[fishId - 1].bait === "지렁이"}
            />
            <SelectTag
              name="새우"
              fill={fishingRecordMocks[fishId - 1].bait === "새우"}
            />
            <SelectTag
              name="게"
              fill={fishingRecordMocks[fishId - 1].bait === "게"}
            />
            <SelectTag
              name="루어"
              fill={fishingRecordMocks[fishId - 1].bait === "루어"}
            />
          </View>
        </View>
        <View className="gap-2">
          <Text className="font-semibold text-lg">낚시 방법</Text>
          <View className="flex-row gap-3">
            <SelectTag
              name="낚싯대"
              fill={fishingRecordMocks[fishId - 1].equipment === "낚싯대"}
            />
            <SelectTag
              name="맨손"
              fill={fishingRecordMocks[fishId - 1].equipment === "맨손"}
            />
            <SelectTag
              name="뜰채"
              fill={fishingRecordMocks[fishId - 1].equipment === "뜰채"}
            />
          </View>
        </View>
      </View>
      <View className="mb-20" />
    </ScrollView>
  );
}
