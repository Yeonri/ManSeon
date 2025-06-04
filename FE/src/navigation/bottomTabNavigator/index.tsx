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
import { CameraScreen } from "../../screens/cameraScreen";
import { MapScreen } from "../../screens/mapScreen";
import { RootStackParams } from "../../types/RootStackParams";
import { CommunityStackNavigator } from "../communityStackNavigator";
import { MainStackNavigator } from "../mainStackNavigator";
import { MoreStackNavigator } from "../moreStackNavigator";

const Tab = createBottomTabNavigator();

function CustomBottomTabButton() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Camera")}
      className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-blue-800 justify-center items-center"
    >
      <Camera color="white" size={36} />
    </TouchableOpacity>
  );
}

function renderTabIcon(IconComponent: React.ElementType) {
  return ({ color }: { color: string }) => <IconComponent color={color} />;
}

export function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          paddingTop: 5,
        },
      }}
    >
      <Tab.Screen
        name="home"
        component={MainStackNavigator}
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
        name="more"
        component={MoreStackNavigator}
        options={{
          title: "더 보기",
          tabBarIcon: renderTabIcon(CircleEllipsis),
        }}
      />
    </Tab.Navigator>
  );
}
