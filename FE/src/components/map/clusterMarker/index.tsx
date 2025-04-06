import { Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

interface Props {
  clusters: any[];
  mapRef: React.RefObject<MapView | null>;
  onMarkerPress: (point: any) => void;
}

export function ClusterMarkers({ clusters, mapRef, onMarkerPress }: Props) {
  return (
    <>
      {clusters.map((item) => {
        const [longitude, latitude] = item.geometry.coordinates;

        if (item.properties.cluster) {
          const pointCount = item.properties.point_count;

          return (
            <Marker
              key={`cluster-${item.id}`}
              coordinate={{ latitude, longitude }}
              onPress={() => {
                const expansionZoom = Math.min(
                  20,
                  // @ts-ignore
                  new item.constructor({
                    radius: 60,
                    maxZoom: 20,
                  }).getClusterExpansionZoom(item.id) || 10
                );

                mapRef.current?.animateToRegion({
                  latitude,
                  longitude,
                  latitudeDelta: 360 / Math.pow(2, expansionZoom),
                  longitudeDelta: 360 / Math.pow(2, expansionZoom),
                });
              }}
            >
              <View className="w-10 h-10 bg-blue-500 rounded-full justify-center items-center">
                <Text className="text-white font-bold">{pointCount}</Text>
              </View>
            </Marker>
          );
        }

        const point = item.properties.point;
        return (
          <Marker
            key={`marker-${point.pointId}`}
            coordinate={{
              latitude: point.latitude,
              longitude: point.longitude,
            }}
            onPress={() => onMarkerPress(point)}
          />
        );
      })}
    </>
  );
}
