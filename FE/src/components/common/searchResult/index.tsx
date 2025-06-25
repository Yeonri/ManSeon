import { MapPin } from "lucide-react-native";
import { FlatList, Text, View } from "react-native";

interface SearchResultItem {
  pointId: number;
  pointName: string;
  lat: number;
  lng: number;
}

interface SearchResultProps {
  results: SearchResultItem[];
}

export function SearchResult({ results }: SearchResultProps) {
  if (!results || results.length === 0) {
    return <Text>검색 결과가 없습니다.</Text>;
  }

  console.log("검색결과 :", results);
  const renderItem = ({ item }: { item: SearchResultItem }) => {
    return (
      <View className="mb-3">
        <View className="flex-row items-center">
          <View className="mr-2">
            <MapPin />
          </View>
          <Text className="font-semibold text-xl text-neutral-600">
            {item.pointName}
          </Text>
        </View>

        <Text className="ml-10 mt-2">
          N {item.lat} / E {item.lng}
        </Text>
      </View>
    );
  };

  return (
    <FlatList
      data={results}
      renderItem={renderItem}
      keyExtractor={(item) => String(item.pointId)}
    />
  );
}
