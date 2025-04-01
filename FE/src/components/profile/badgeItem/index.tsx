import { Image, View } from "react-native";
import { badgeDefault, badgeImages } from "../../../utils/badgeImage";

type BadgeItemProps = {
  badge: {
    id: number;
    is_earned: boolean;
  };
};

export function BadgeItem({ badge }: BadgeItemProps) {
  const badgeImage = badge.is_earned ? badgeImages[badge.id] : badgeDefault;

  return (
    <View className="w-28 h-28 items-center justify-center rounded-2xl">
      <Image
        source={badgeImage}
        className="w-full h-full rounded-2xl"
        resizeMode="contain"
      />
    </View>
  );
}
