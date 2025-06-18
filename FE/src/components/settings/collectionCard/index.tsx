import type { ImageSourcePropType } from "react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface CollectionCardProps {
  id: number;
  name: string;
  image: ImageSourcePropType;
  isCollected: boolean;
  onPress: () => void;
}

export default function CollectionCard({
  id,
  name,
  image,
  isCollected,
  onPress,
}: CollectionCardProps) {
  return (
    <TouchableOpacity
      className="w-[100px] h-[120px] rounded-xl overflow-hidden items-center justify-center border border-neutral-50"
      onPress={isCollected ? onPress : undefined}
      disabled={!isCollected}
      activeOpacity={0.8}
    >
      <Image
        source={image}
        className="absolute w-[90%] h-[90%] top-1"
        resizeMode="contain"
      />

      {!isCollected && (
        <View className="absolute w-[100px] h-[120px]  bg-black/50 justify-center items-center rounded-xl">
          <Image
            source={require("../../../assets/images/icon_lock.png")}
            className="w-20 h-20"
            resizeMode="center"
          />
        </View>
      )}

      <Text className="font-semibold text-sm mt-auto mb-2">{name}</Text>
    </TouchableOpacity>
  );
}
