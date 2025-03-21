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
            className="w-36 h-48 rounded-xl"
          />
          <Image
            source={{
              uri: item.profileImg,
            }}
            className="absolute w-20 h-20 rounded-full bottom-2 left-1/2 -translate-x-1/2 "
          />
        </View>
      )}
      horizontal
    />
  );
}
