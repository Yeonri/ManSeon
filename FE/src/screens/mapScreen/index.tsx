import { useMemo, useRef, useState } from "react";
import { View } from "react-native";
import MapView, { Region } from "react-native-maps";
import { Modalize } from "react-native-modalize";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFishingPoints } from "../../api/quries/useFishingpoint";
import { SearchInput } from "../../components/common/searchInput";
import { SearchModal } from "../../components/common/searchModal";
import { ClusterMarkers } from "../../components/map/clusterMarker";
import { FilterButton } from "../../components/map/filterButton";
import { MarkerDetail } from "../../components/map/markerDetail";
import { useClustering } from "../../hooks/useClustering";

export function MapScreen() {
  const [activeFilter, setActiveFilter] = useState<
    "all" | "myPoint" | "bookmark" | "recommended"
  >("all");

  const { data: points = [] } = useFishingPoints();

  const [region, setRegion] = useState<Region>({
    latitude: 36.5,
    longitude: 127.75,
    latitudeDelta: 10.0,
    longitudeDelta: 7.5,
  });

  const filterPoints = useMemo(() => {
    return points.filter((point: any) => {
      if (activeFilter === "myPoint") return point.isMyPoint;
      if (activeFilter === "bookmark") return point.isBookmarked;
      if (activeFilter === "recommended") return point.isRecommended;
      return true;
    });
  }, [points, activeFilter]);

  const mapRef = useRef<MapView>(null);
  const modalRef = useRef<Modalize>(null);

  const [keyword, setKeyword] = useState("");

  const handleSEarch = () => {
    setShowModal(true);
  };

  const zoom = Math.round(Math.log(360 / region.longitudeDelta) / Math.LN2);
  const { clusters, supercluster } = useClustering(filterPoints, region, zoom);

  const [showModal, setShowModal] = useState(false);

  const [selectedPoint, setSelectedPoint] = useState<any>(null);

  return (
    <SafeAreaView className="flex-1">
      <View className="absolute top-10 left-0 right-0 z-10 items-center">
        <SearchInput
          value={keyword}
          onChangeText={setKeyword}
          onSearchPress={handleSEarch}
        />
        <View className="flex-row items-center">
          <FilterButton
            label="전체"
            active={activeFilter === "all"}
            onPress={() => setActiveFilter("all")}
          />
          <FilterButton
            label="내 포인트"
            active={activeFilter === "myPoint"}
            onPress={() => setActiveFilter("myPoint")}
          />
          <FilterButton
            label="북마크"
            active={activeFilter === "bookmark"}
            onPress={() => setActiveFilter("bookmark")}
          />
          <FilterButton
            label="추천"
            active={activeFilter === "recommended"}
            onPress={() => setActiveFilter("recommended")}
          />
        </View>
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
          onMarkerPress={(point) => {
            setSelectedPoint(point);
            modalRef.current?.open();
          }}
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
