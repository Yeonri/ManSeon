import { X } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

interface CollectionMapModalProps {
  visible: boolean;
  onClose: () => void;
  latitude: number;
  longitude: number;
}

export default function CollectionMapModal({
  visible,
  onClose,
  latitude,
  longitude,
}: CollectionMapModalProps) {
  if (!visible) return null;

  return (
    <View className="absolute inset-0 h-full w-full items-center justify-center bg-black/40 z-50">
      <View className="bg-white rounded-2xl w-[80%] p-4">
        <TouchableOpacity
          onPress={onClose}
          className="flex flex-row-reverse -mb-4"
        >
          <X />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-center mb-3">스팟 정보</Text>

        <View className="rounded-xl overflow-hidden h-32 mb-3">
          <MapView
            key={`${latitude}-${longitude}`}
            style={{ flex: 1 }}
            initialRegion={{
              latitude,
              longitude,
              latitudeDelta: 1,
              longitudeDelta: 1,
            }}
            scrollEnabled={false}
            zoomEnabled={false}
            pointerEvents="none"
          >
            <Marker coordinate={{ latitude, longitude }} />
          </MapView>
        </View>

        <View className="border border-neutral-300 rounded-lg p-3">
          <Text className="text-xs text-neutral-500">
            ({latitude}, {longitude})
          </Text>
        </View>
      </View>
    </View>
  );
}
