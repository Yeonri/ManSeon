import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { RecordStackParams } from "../../../navigation/types";
import { useGetFishingRecordDetail } from "../../../api/queries/fishingRecord";
import Header from "../../../components/common/header";
import SelectButton from "../../../components/common/selectButton";

interface RecordDetailScreenProps
  extends NativeStackScreenProps<RecordStackParams, "RecordDetail"> {}

export function RecordDetailScreen({ route }: RecordDetailScreenProps) {
  const { title, fishId } = route.params;
  const { data: response, refetch } = useGetFishingRecordDetail();
  console.log("응답 전체 :", response);

  const record = response?.data ?? [];
  console.log("전체 게시글:", record);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  return (
    <ScrollView className="flex-1">
      <Header logo={false} title={title} before={true} />
      <View className="gap-7 mx-5">
        <View className="items-center">
          <Image
            source={{ uri: record.fishImg }}
            className="w-full h-[250px] rounded-xl"
          />
        </View>
        <View className="gap-2">
          <Text className="font-semibold text-lg text-neutral-600">
            물고기 정보
          </Text>
          <View className="flex-row gap-3">
            <SelectButton
              name={record.fishType}
              fill={true}
              onPress={() => {}}
            />
            <SelectButton
              name={`${record.size}cm`}
              fill={false}
              onPress={() => {}}
            />
          </View>
        </View>
        <View className="gap-2">
          <Text className="font-semibold text-lg text-neutral-600">
            환경 정보
          </Text>
          <View className="bg-neutral-100 rounded-lg p-5">
            <View className="flex-row gap-2">
              <Text className="text-neutral-600">시간</Text>
              <Text className="text-neutral-400">{record.createAt}</Text>
            </View>
            <View className="flex-row gap-2">
              <Text className="text-neutral-600">물때</Text>
              <Text className="text-neutral-400">
                {record.season}물 (서해 {record.season - 1}물)
              </Text>
            </View>
          </View>
        </View>
        <View className="gap-2">
          <Text className="font-semibold text-lg text-neutral-600">
            위치 정보
          </Text>
          <View className="bg-neutral-100 rounded-lg p-5">
            <View className="flex-row gap-2">
              <Text className="text-neutral-600">위도</Text>
              <Text className="text-neutral-400">{record.lat}</Text>
            </View>
            <View className="flex-row gap-2">
              <Text className="text-neutral-600">경도</Text>
              <Text className="text-neutral-400">{record.lng}</Text>
            </View>
          </View>
        </View>
        <View className="gap-2">
          <Text className="font-semibold text-lg text-neutral-600">
            미끼 정보
          </Text>
          <View className="flex-row gap-3">
            <SelectButton
              name="지렁이"
              fill={record === "지렁이"}
              onPress={() => {}}
            />
            <SelectButton
              name="새우"
              fill={record === "새우"}
              onPress={() => {}}
            />
            <SelectButton name="게" fill={record === "게"} onPress={() => {}} />
            <SelectButton
              name="루어"
              fill={record === "루어"}
              onPress={() => {}}
            />
            <SelectButton
              name="지렁이"
              fill={record === "지렁이"}
              onPress={() => {}}
            />
          </View>
        </View>
        <View className="gap-2">
          <Text className="font-semibold text-lg text-neutral-600">
            낚시 방법
          </Text>
          <View className="flex-row gap-3">
            <SelectButton
              name="낚싯대"
              fill={record === "낚싯대"}
              onPress={() => {}}
            />
            <View className="flex-row gap-3">
              <SelectButton
                name="맨손"
                fill={record === "맨손"}
                onPress={() => {}}
              />
              <View className="flex-row gap-3">
                <SelectButton
                  name="뜰채"
                  fill={record === "뜰채"}
                  onPress={() => {}}
                />
              </View>
            </View>
          </View>
        </View>
        <View className="mb-20" />
      </View>
    </ScrollView>
  );
}
