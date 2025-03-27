import { View } from "react-native";
import { Marker } from "react-native-maps";

interface MarkerProps {
  points: {
    pointID: number;
    latitude: number;
    longitude: number;
    name: string;
  }[];
}

export function Markers({ points }: MarkerProps) {
  return (
    <View>
      {points.map((point) => (
        <Marker
          key={`marker-${point.pointID}`}
          coordinate={{
            latitude: point.latitude,
            longitude: point.longitude,
          }}
          title={point.name}
        />
      ))}
    </View>
  );
}
