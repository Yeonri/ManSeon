import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { Recomment } from "../../../api/types/Recomment";
import IconArrow from "../../../assets/images/icon_arrow.svg";
import TagFollow from "../../../assets/images/tag_follow.svg";

export function RecommentList({ recomments }: { recomments: Recomment[] }) {
  function formatTime(time: string) {
    return formatDistanceToNow(new Date(time), { addSuffix: true, locale: ko });
  }

  return (
    <View>
      <FlatList
        data={recomments}
        renderItem={({ item }) => (
          <View>
            <View className="flex-row items-center justify-between mt-3 mb-2">
              <View className="flex-row items-center">
                <IconArrow />
                <View className="flex-row items-center gap-2">
                  <TouchableOpacity className="flex-row items-center gap-2">
                    <Image
                      source={{ uri: item.profileImg }}
                      className="w-10 h-10 rounded-full"
                    />
                    <Text className="font-semibold">{item.nickname}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <TagFollow />
                  </TouchableOpacity>
                </View>
              </View>
              <Text className="text-neutral-400 text-sm">
                {formatTime(item.createAt)}
              </Text>
            </View>
            <Text className="ml-16">{item.recommentContent}</Text>
          </View>
        )}
      />
    </View>
  );
}
