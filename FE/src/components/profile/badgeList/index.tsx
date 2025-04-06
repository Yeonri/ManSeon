import { FlatList, Text, View } from "react-native";
import { BadgeItem } from "../badgeItem";

interface BadgeListProps {
  badgeIds: number[];
  user: {
    fishing_total: number;
    posts: any[];
    following_cnt: number;
    follower_cnt: number;
    profile_img: string;
  };
}

export function BadgeList({ badgeIds, user }: BadgeListProps) {
  return (
    <View className="mx-5 mt-8 mb-5">
      <Text className="text-lg font-bold text-neutral-800 mb-3">활동 배지</Text>

      <FlatList
        data={badgeIds}
        renderItem={({ item }) => (
          <View className="w-1/3 mb-4 items-center">
            <BadgeItem id={item} user={user} />
          </View>
        )}
        keyExtractor={(item) => item.toString()}
        numColumns={3}
        scrollEnabled={false}
      />
    </View>
  );
}
