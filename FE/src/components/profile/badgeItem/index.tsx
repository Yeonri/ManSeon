import { Image, View } from "react-native";
import { badgeImages, badgeLockImages } from "../../../utils/badgeImage";

interface BadgeItemProps {
  id: number;

  user: {
    followingCount: number;
    followerCount: number;
    profileImg: string;
    fishCollections: { [key: number]: number[] };
  };
}

export function BadgeItem({ id, user }: BadgeItemProps) {
  const collectionCount = Object.values(
    user.fishCollections as Record<string, any[]>
  ).filter((arr) => arr.length > 0).length;

  const isUnlocked = (() => {
    switch (id) {
      case 1:
        return collectionCount >= 1;
      // case 2:
      //   return user.posts.length >= 1;
      case 3:
        return user.followingCount >= 1 || user.followerCount >= 1;
      case 6:
        return collectionCount >= 10;
      case 7:
        return user.profileImg !== null;
      case 9:
        return collectionCount === 24;
      default:
        return false;
    }
  })();
  const badgeImage = isUnlocked ? badgeImages[id] : badgeLockImages[id];

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
