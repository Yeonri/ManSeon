import { RouteProp, useRoute } from "@react-navigation/native";
// import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderBeforeTitle } from "../../components/common/headerBeforeTitle";
import type { MoreStackParams } from "../../types/MoreStackParams";

type CollectionDetailRouteProp = RouteProp<MoreStackParams, "CollectionDetail">;

export function CollectionScreen() {
  const { params } = useRoute<CollectionDetailRouteProp>();
  const { name, description, image, collection_info } = params;
  // const [selectedMarker, setSelectedMarker] = useState<{
  //   latitude: number;
  //   longitude: number;
  // } | null>(null);

  return (
    <SafeAreaView className="flex-1">
      <HeaderBeforeTitle name="낚시 도감 상세" />
      <View className="flex-1 relative">
        <ScrollView className="px-5">
          <Image
            source={image}
            className="w-full h-60 mt-6 mb-4"
            resizeMode="contain"
          />
          <Text className="text-2xl font-bold text-neutral-800 text-center mt-5 mb-5">
            {name}
          </Text>

          <Text className="text-base  text-neutral-600 mb-4">
            {description}
          </Text>

          {collection_info.length > 0 && (
            <View className="h-80 rounded-xl overflow-hidden mb-6">
              <MapView
                style={{ flex: 1 }}
                initialRegion={{
                  latitude: collection_info[0].latitude,
                  longitude: collection_info[0].longitude,
                  latitudeDelta: 2,
                  longitudeDelta: 2,
                }}
              >
                {collection_info.map((info, index) => (
                  <Marker
                    key={index}
                    coordinate={{
                      latitude: info.latitude,
                      longitude: info.longitude,
                    }}
                    // onPress={() =>
                    //   setSelectedMarker({
                    //     latitude: info.latitude,
                    //     longitude: info.longitude,
                    //   })
                    // }
                  />
                ))}
              </MapView>
              {/* {selectedMarker && (
                <CollectionMapModal
                  visible={true}
                  onClose={() => setSelectedMarker(null)}
                  latitude={selectedMarker.latitude}
                  longitude={selectedMarker.longitude}
                />
              )} */}
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
