import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CollectionListScreen } from "../../screens/collectionListScreen";
import { CollectionScreen } from "../../screens/collectionScreen";
import { CommunityScreen } from "../../screens/communityScreen";
import { MainScreen } from "../../screens/mainScreen";
import { MapScreen } from "../../screens/mapScreen";
import { PostScreen } from "../../screens/postScreen";
import { ProfileScreen } from "../../screens/profileScreen";
import { MainStackParams } from "../../types/MainStackParams";

const Stack = createNativeStackNavigator<MainStackParams>();

export function MainStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen name="Community" component={CommunityScreen} />
      <Stack.Screen name="CollectionList" component={CollectionListScreen} />
      <Stack.Screen name="CollectionDetail" component={CollectionScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Post" component={PostScreen} />
    </Stack.Navigator>
  );
}
