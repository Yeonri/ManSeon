import { Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

interface Props {
  clusters: any[];
  mapRef: React.RefObject<MapView | null>;
  onMarkerPress: (point: any) => void;
  supercluster: any;
}

export function ClusterMarkers({
  clusters,
  mapRef,
  onMarkerPress,
  supercluster,
}: Props) {
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
              anchor={{ x: 0.5, y: 0.5 }}
              onPress={() => {
                const expansionZoom = supercluster.getClusterExpansionZoom(
                  item.id
                );
                mapRef.current?.animateToRegion({
                  latitude,
                  longitude,
                  latitudeDelta: 360 / Math.pow(2, expansionZoom),
                  longitudeDelta: 360 / Math.pow(2, expansionZoom),
                });
              }}
            >
              <View className="w-16 h-16 bg-red-400/70 rounded-full justify-center items-center">
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
