import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CommunityScreen } from "../../screens/community/communityScreen";
import { PostScreen } from "../../screens/community/postScreen";
import { HomeScreen } from "../../screens/home/homeScreen";
import { MapScreen } from "../../screens/map/mapScreen";
import { CollectionListScreen } from "../../screens/settings/collectionListScreen";
import { CollectionScreen } from "../../screens/settings/collectionScreen";
import { ProfileScreen } from "../../screens/settings/profileScreen";
import { HomeStackParams } from "../types";

const Stack = createNativeStackNavigator<HomeStackParams>();

export function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen name="Community" component={CommunityScreen} />
      <Stack.Screen name="CollectionList" component={CollectionListScreen} />
      <Stack.Screen name="CollectionDetail" component={CollectionScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Post" component={PostScreen} />
    </Stack.Navigator>
  );
}
