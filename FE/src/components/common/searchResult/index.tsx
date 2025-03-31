import { FlatList, Text, View } from "react-native";
import MarkerIcon from "../../../assets/images/icon_marker.svg";
import searchResultMocks from "../../../mocks/searchResultMocks.json";

interface searchResultItem {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export function SearchResult() {
  const renderItem = ({ item }: { item: searchResultItem }) => {
    return (
      <View className="mb-3">
        <View className="flex-row items-center">
          <View className="mr-2">
            <MarkerIcon />
          </View>
          <Text className="font-semibold text-xl text-neutral-600">
            {item.name}
          </Text>
        </View>

        <Text>
          N {item.latitude} / E {item.longitude}
        </Text>
      </View>
    );
  };

  return (
    <FlatList
      data={searchResultMocks}
      renderItem={renderItem}
      keyExtractor={(item) => String(item.id)}
    />
  );
}
