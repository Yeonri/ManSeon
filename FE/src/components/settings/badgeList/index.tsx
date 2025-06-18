import { FlatList, Text, View } from "react-native";
import { BadgeItem } from "../badgeItem";

interface BadgeListProps {
  badgeIds: number[];
  user: {
    fishing_total: number;
    followingCount: number;
    followerCount: number;
    profileImg: string;
    fishCollections: { [key: number]: number[] };
  };
}

export default function BadgeList({ badgeIds, user }: BadgeListProps) {
  return (
    <View className="gap-3">
      <Text className="text-neutral-600 font-bold -translate-y-[2px]">
        활동 배지
      </Text>
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
