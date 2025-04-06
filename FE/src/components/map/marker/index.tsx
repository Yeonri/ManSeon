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
  if (!points || !Array.isArray(points)) return null;

  // 잘못된 포인트는 제거
  const safePoints = points.filter(
    (point) =>
      point &&
      typeof point.latitude === "number" &&
      typeof point.longitude === "number" &&
      point.pointId !== undefined
  );

  return (
    <View>
      {safePoints.map((point) => (
        <Marker
          key={`marker-${point.pointId}`}
          coordinate={{
            latitude: point.latitude,
            longitude: point.longitude,
          }}
          // image={require("../../../assets/images/icon_marker_default.png")}
          onPress={() => onMarkerPress(point)}
        />
      ))}
    </View>
  );
}
