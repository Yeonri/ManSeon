// src/components/common/searchResult.tsx
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

        <Text>
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
