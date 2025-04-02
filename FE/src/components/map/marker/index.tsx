import { View } from "react-native";
import { Marker } from "react-native-maps";

interface MarkerProps {
  points: {
    pointId: number;
    latitude: number;
    longitude: number;
    name: string;
  }[];
  onMarkerPress: (point: any) => void;
}

export function Markers({ points, onMarkerPress }: MarkerProps) {
  return (
    <View>
      {points.map((point) => (
        <Marker
          key={`marker-${point.pointId}`}
          coordinate={{
            latitude: point.latitude,
            longitude: point.longitude,
          }}
          onPress={() => onMarkerPress(point)}
        />
      ))}
    </View>
  );
}
