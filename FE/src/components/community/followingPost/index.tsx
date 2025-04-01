import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import { CommunityStackParams } from "../../../api/types/CommunityStackParams";
import friendsPostMocks from "../../../mocks/friendsPostMocks.json";

interface CommunityScreenNavigationProps
  extends NativeStackNavigationProp<CommunityStackParams, "Community"> {}

export function FollowingPost() {
  const navigation = useNavigation<CommunityScreenNavigationProps>();

  function handlePostClick(postId: number) {
    navigation.navigate("Post", { postId });
  }
  return (
    <FlatList
      data={friendsPostMocks}
      renderItem={({ item }) => (
        <View className="relative mx-1 my-1">
          <TouchableOpacity onPress={() => handlePostClick(item.postId)}>
            <Image
              source={{
                uri: item.postImg,
              }}
              className="w-24 h-36 rounded-xl"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Image
              source={{
                uri: item.profileImg,
              }}
              className="absolute w-12 h-12 rounded-full bottom-2 left-1/2 -translate-x-1/2 "
            />
          </TouchableOpacity>
        </View>
      )}
      horizontal
    />
  );
}
