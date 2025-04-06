import { Image, View } from "react-native";
import { badgeImages, badgeLockImages } from "../../../utils/badgeImage";

interface BadgeItemProps {
  id: number;

  user: {
    fishing_total: number;
    posts: any[];
    following_cnt: number;
    follower_cnt: number;
    profile_img: string;
    collection_cnt: number;
  };
}

export function BadgeItem({ id, user }: BadgeItemProps) {
  const isUnlocked = (() => {
    switch (id) {
      case 1:
        return user.fishing_total >= 1;
      case 2:
        return user.posts.length >= 1;
      case 3:
        return user.following_cnt >= 1 || user.follower_cnt >= 1;
      case 6:
        return user.fishing_total >= 10;
      case 7:
        return user.profile_img !== null;
      case 9:
        return user.collection_cnt === 24;
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
