import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  Camera,
  CircleEllipsis,
  House,
  MapPlus,
  MessagesSquare,
} from "lucide-react-native";
import { TouchableOpacity } from "react-native";
import { CommunityStackNavigator } from "../communityStackNavigator";
import { HomeStackNavigator } from "../homeStackNavigator";
import { RootStackParams } from "../types";
import MapScreen from "../../screens/map/mapScreen";
import CameraScreen from "../../screens/camera/cameraScreen";
import SettingsScreen from "../../screens/settings/settingsScreen";

const Tab = createBottomTabNavigator();

function CustomBottomTabButton() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Camera")}
      className="absolute -top-6 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-blue-800 justify-center items-center"
    >
      <Camera color="white" size={30} />
    </TouchableOpacity>
  );
}

function renderTabIcon(IconComponent: React.ElementType) {
  return ({ color }: { color: string }) => (
    <IconComponent color={color} size={22} />
  );
}

export function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 70,
          paddingTop: 5,
        },
      }}
    >
      <Tab.Screen
        name="home"
        component={HomeStackNavigator}
        options={{
          title: "홈",
          tabBarIcon: renderTabIcon(House),
        }}
      />
      <Tab.Screen
        name="map"
        component={MapScreen}
        options={{
          title: "지도",
          tabBarIcon: renderTabIcon(MapPlus),
        }}
      />
      <Tab.Screen
        name="camera"
        component={CameraScreen}
        options={{
          title: "",
          tabBarIcon: () => null,
          tabBarButton: CustomBottomTabButton,
        }}
      />
      <Tab.Screen
        name="community"
        component={CommunityStackNavigator}
        options={{
          title: "커뮤니티",
          tabBarIcon: renderTabIcon(MessagesSquare),
        }}
      />
      <Tab.Screen
        name="setting"
        component={SettingsScreen}
        options={{
          title: "더 보기",
          tabBarIcon: renderTabIcon(CircleEllipsis),
        }}
      />
    </Tab.Navigator>
  );
}
