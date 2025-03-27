import { useMemo, useState } from "react";
import { StatusBar, View } from "react-native";
import MapView from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { FilterButton } from "../../components/map/filterButton";
import { Markers } from "../../components/map/marker";
import fishinPointMocks from "../../mocks/fishingPointMocks.json";

export function MapScreen() {
  const [activeFilter, setActiveFilter] = useState<
    "all" | "myPoint" | "bookmark" | "recommended"
  >("all");

  const filterPoints = useMemo(() => {
    return fishinPointMocks.filter((point) => {
      if (activeFilter === "myPoint") return point.isMyPoint;
      if (activeFilter === "bookmark") return point.isBookmarked;
      if (activeFilter === "recommended") return point.isRecommended;
      return true;
    });
  }, [activeFilter]);

  const statusBarHeight = StatusBar.currentHeight;

  return (
    <SafeAreaView className="flex-1">
      <View className="absolute top-10 left-0 right-0 z-10 items-center">
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
        key={activeFilter}
        removeClippedSubviews={false}
        style={{
          position: "absolute",
          top: statusBarHeight,
          bottom: 0,
          left: 0,
          right: 0,
        }}
        initialRegion={{
          latitude: 36.5,
          longitude: 127.75,
          latitudeDelta: 10.0,
          longitudeDelta: 7.5,
        }}
      >
        <Markers points={filterPoints} />
      </MapView>
    </SafeAreaView>
  );
}
