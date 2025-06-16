import { Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

interface fishingPointProps {
  name: string;
  latitude: number;
  longitude: number;
  onPress?: () => void;
}

export default function FishingPointCard({
  name,
  latitude,
  longitude,
}: fishingPointProps) {
  return (
    <TouchableOpacity className="p-3 flex-row items-center bg-blue-50 rounded-xl gap-3">
      {/* 지도 */}
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

      {/* 장소 정보 */}
      <View className="gap-1">
        <Text className="font-bold text-neutral-800">{name}</Text>
        <Text className="text-neutral-400 text-sm">
          (N {latitude.toFixed(3)}, E {longitude.toFixed(3)})
        </Text>
      </View>
    </TouchableOpacity>
  );
}
