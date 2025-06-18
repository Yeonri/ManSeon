import { Image, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/common/header";
import { SettingsStackParams } from "../../../navigation/types";
import { RouteProp, useRoute } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";

type CollectionDetailRouteProp = RouteProp<
  SettingsStackParams,
  "CollectionDetail"
>;

export default function CollectionDetailScreen() {
  const { params } = useRoute<CollectionDetailRouteProp>();
  const { name, description, image, collection_info } = params;
  // const [selectedMarker, setSelectedMarker] = useState<{
  //   latitude: number;
  //   longitude: number;
  // } | null>(null);

  return (
    <SafeAreaView>
      {/* 헤더 */}
      <Header logo={false} title="낚시 도감" before={true} />

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
