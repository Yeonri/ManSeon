import { RouteProp, useRoute } from "@react-navigation/native";
import { Image, ScrollView, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import type { MoreStackParams } from "../../api/types/moreStackParams";
import { HeaderBeforeTitle } from "../../components/common/headerBeforeTitle";

type CollectionDetailRouteProp = RouteProp<MoreStackParams, "CollectionDetail">;

export function CollectionScreen() {
  const { params } = useRoute<CollectionDetailRouteProp>();
  const { name, description, image, collection_info } = params;

  return (
    <SafeAreaView className="flex-1">
      <HeaderBeforeTitle name="낚시 도감" />
      <ScrollView className="px-5">
        <Image
          source={image}
          className="w-full h-60 mt-6 mb-4"
          resizeMode="contain"
        />
        <Text className="text-2xl font-bold text-neutral-800 text-center mt-5 mb-5">
          {name}
        </Text>

        <Text className="text-base  text-neutral-600 mb-4">{description}</Text>

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
                  title={info.location_name}
                  description={`(${info.latitude}, ${info.longitude})`}
                />
              ))}
            </MapView>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
