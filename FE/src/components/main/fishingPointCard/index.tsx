import { Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

interface fishingPointProps {
  name: string;
  latitude: number;
  longitude: number;
  onPress?: () => void;
}

export function FishingPointCard({
  name,
  latitude,
  longitude,
}: fishingPointProps) {
  return (
    <TouchableOpacity className="flex-row items-center bg-white border border-neutral-50 rounded-2xl p-3">
      <View className="w-20 h-20 rounded-xl overflow-hidden">
        <MapView
          style={{ width: "100%", height: "100%" }}
          region={{
            latitude,
            longitude,
            latitudeDelta: 1,
            longitudeDelta: 1,
          }}
          pointerEvents="none"
          scrollEnabled={false}
          zoomEnabled={false}
        >
          <Marker coordinate={{ latitude, longitude }} />
        </MapView>
      </View>

      <View className="ml-4">
        <Text className="font-bold text-lg text-neutral-800">{name}</Text>
        <Text className="text-neutral-500">
          (N {latitude.toFixed(3)}, E {longitude.toFixed(3)})
        </Text>
      </View>
    </TouchableOpacity>
  );
}
