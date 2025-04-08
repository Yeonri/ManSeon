import { TouchableOpacity } from "react-native";
import TagFollow from "../../../assets/images/tag_follow.svg";
import TagFollowing from "../../../assets/images/tag_following.svg";

interface FollowButtonProps {
  isFollowing: boolean;
  onPress: () => void;
}

export function FollowButton({ isFollowing, onPress }: FollowButtonProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      {isFollowing ? <TagFollowing /> : <TagFollow />}
    </TouchableOpacity>
  );
}
