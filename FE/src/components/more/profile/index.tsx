import { Image, Text, View } from "react-native";

export function ProfileCard() {
  return (
    <View className="bg-blue-800 rounded-2xl px-5 py-6 mb-3 mx-4 flex-row items-center">
      <Image
        source={{
          uri: "https://i.pinimg.com/736x/db/c2/fd/dbc2fdc3595a409809b967ac51c45750.jpg",
        }}
        className="w-20 h-20 rounded-full mr-4"
        resizeMode="contain"
      />
      <View>
        <View className="flex-row items-center gap-1">
          <Text className="text-white text-xl font-bold">만선이</Text>
        </View>
        <Text className="text-white text-base mt-1">
          팔로잉 123명 / 팔로워 50명
        </Text>
      </View>
    </View>
  );
}
