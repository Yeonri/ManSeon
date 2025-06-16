import { useRef, useState } from "react";
import { useGetFishingPoints } from "../../../api/queries/fishingPoint";
import MapView, { Region } from "react-native-maps";
import { Modalize } from "react-native-modalize";
import { useClustering } from "../../../hooks/useClustering";
import { getFishingPointDetail } from "../../../api/fishingPoint";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import SearchInput from "../../../components/common/searchInput";
import SearchModal from "../../../components/common/searchModal";
import ClusterMarkers from "../../../components/map/clusterMarker";
import MarkerDetail from "../../../components/map/markerDetail";

export default function MapScreen() {
  // const { data: points = [] } = useGetFishingPoints();

  // 임시 데이터
  const points = [
    {
      point_id: 1,
      name: "서해 낚시터",
      latitude: 36.2,
      longitude: 126.7,
    },
    {
      point_id: 2,
      name: "동해 낚시터",
      latitude: 37.5,
      longitude: 129.1,
    },
  ];

  const [region, setRegion] = useState<Region>({
    latitude: 36.5,
    longitude: 127.75,
    latitudeDelta: 10.0,
    longitudeDelta: 7.5,
  });

  const mapRef = useRef<MapView>(null);
  const modalRef = useRef<Modalize>(null);

  const [keyword, setKeyword] = useState("");

  const zoom = Math.round(Math.log(360 / region.longitudeDelta) / Math.LN2);
  const { clusters, supercluster } = useClustering(points, region, zoom);

  const [showModal, setShowModal] = useState(false);

  const [selectedPoint, setSelectedPoint] = useState<any>(null);

  const handleMarkerPress = async (point: any) => {
    const pointDetail = await getFishingPointDetail(point.point_id);

    setSelectedPoint({ ...point, ...pointDetail });

    modalRef.current?.open();
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="mx-5 absolute top-10 left-0 right-0 z-10 items-center">
        <SearchInput
          value={keyword}
          onChangeText={setKeyword}
          onSearchPress={() => setShowModal(true)}
        />
      </View>

      <MapView
        ref={mapRef}
        region={region}
        onRegionChangeComplete={(r) => setRegion(r)}
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <ClusterMarkers
          clusters={clusters}
          mapRef={mapRef}
          onMarkerPress={handleMarkerPress}
          supercluster={supercluster}
        />
      </MapView>

      <MarkerDetail ref={modalRef} point={selectedPoint} />

      <SearchModal
        visible={showModal}
        keyword={keyword}
        onChangeText={setKeyword}
        onSearch={() => {}}
        onClose={() => {
          setShowModal(false);
        }}
      />
    </SafeAreaView>
  );
}
