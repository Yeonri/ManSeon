import { Text, View } from "react-native";
import { BadgeItem } from "../badgeItem";

type BadgeListProps = {
  badges: {
    id: number;
    is_earned: boolean;
  }[];
};

export function BadgeList({ badges }: BadgeListProps) {
  return (
    <View className="mx-5 mt-8 mb-5">
      <Text className="text-lg font-bold text-neutral-800 mb-3">활동 배지</Text>

      <View className="flex-row flex-wrap justify-between gap-y-4">
        {badges.map((badge) => (
          <BadgeItem key={badge.id} badge={badge} />
        ))}
      </View>
    </View>
  );
}
