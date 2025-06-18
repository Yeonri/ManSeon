import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";
import { HomeStackParams } from "../../../navigation/types";
import { ChevronRight } from "lucide-react-native";

interface CollectionNavigationProps
  extends NativeStackNavigationProp<HomeStackParams> {}

export default function Collection({ style }: { style?: boolean }) {
  const navigation = useNavigation<CollectionNavigationProps>();

  // 임시 데이터
  const collectionCount = 12;

  const progress = Math.min((collectionCount / 24) * 100, 100);

  if (style) {
    return (
      <View className="gap-3">
        <TouchableOpacity
          className="flex-row items-center gap-1"
          onPress={() => navigation.navigate("Collection")}
        >
          <Text className="text-neutral-600 font-bold -translate-y-[2px]">
            도감 현황
          </Text>

          <ChevronRight color="#525252" width={20} />
        </TouchableOpacity>

        <View className="p-3 bg-blue-50 rounded-xl">
          <View className="mx-2 flex-row justify-start items-baseline">
            <Text className="text-blue-500 font-bold text-3xl">
              {collectionCount}
            </Text>
            <Text className="text-neutral-400 font-bold text-lg"> / 24</Text>
          </View>

          <View className="h-4 bg-white rounded-full mt-2 overflow-hidden w-[95%] self-center">
            <View
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </View>
        </View>
      </View>
    );
  }
  return (
    <View>
      <TouchableOpacity
        className="flex-row items-center gap-1"
        onPress={() => navigation.navigate("Collection")}
      >
        <Text className="text-neutral-600 font-bold -translate-y-[2px]">
          도감
        </Text>

        <ChevronRight color="#525252" width={20} />
      </TouchableOpacity>

      <View className="flex-row justify-end mx-5 items-baseline">
        <Text className="text-blue-500 font-bold text-3xl">
          {collectionCount}
        </Text>
        <Text className="text-neutral-400 font-bold text-lg"> / 24</Text>
      </View>

      <View className="h-4 bg-blue-50 rounded-full mt-2 overflow-hidden w-[95%] self-center">
        <View
          className="h-full bg-blue-500 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </View>
    </View>
  );
}
