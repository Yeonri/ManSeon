import { FlatList, Image, View } from "react-native";
import friendsPostMocks from "../../../mocks/friendsPostMocks.json";

export function FollowingPost() {
  return (
    <FlatList
      data={friendsPostMocks}
      renderItem={({ item }) => (
        <View className="relative mx-1 my-3">
          <Image
            source={{
              uri: item.postImg,
            }}
            className="w-24 h-36 rounded-xl"
          />
          <Image
            source={{
              uri: item.profileImg,
            }}
            className="absolute w-12 h-12 rounded-full bottom-2 left-1/2 -translate-x-1/2 "
          />
        </View>
      )}
      horizontal
    />
  );
}
