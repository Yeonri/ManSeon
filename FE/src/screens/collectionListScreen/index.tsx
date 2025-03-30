import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CollectionCard from "../../components/collection/collectionCard";
import { HeaderBeforeTitle } from "../../components/common/headerBeforeTitle";
import processedFishData from "../../utils/processedFishData";

export function CollectionListScreen() {
  return (
    <SafeAreaView edges={["top"]} className="flex-1 ">
      <HeaderBeforeTitle name="낚시 도감" />

      <FlatList
        data={processedFishData}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        className="flex-1 px-5"
        contentContainerClassName="gap-y-5 pb-2"
        columnWrapperClassName="justify-between"
        renderItem={({ item }) => (
          <CollectionCard
            id={item.id}
            name={item.name}
            image={item.image}
            isCollected={item.is_collected}
          />
        )}
      />
    </SafeAreaView>
  );
}
