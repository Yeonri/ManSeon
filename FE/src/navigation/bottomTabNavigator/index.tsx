import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainScreen } from "../../screens/mainScreen";
import { MapScreen } from "../../screens/mapScreen";
import { RecordScreen } from "../../screens/recordScreen";
import { CommunityStackNavigator } from "../communityStackNavigator";
import { MoreStackNavigator } from "../moreStackNavigator";
import {
  House,
  MapPlus,
  Plus,
  MessagesSquare,
  CircleEllipsis,
} from "lucide-react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../api/types/RootStackParamList";

const Tab = createBottomTabNavigator();

function CustomBottomTabButton() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("record")}
      className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-blue-600 justify-center items-center"
    >
      <Plus color="white" size={32} />
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
      }}
    >
      <Tab.Screen
        name="home"
        component={MainScreen}
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
        name="addRecord"
        component={RecordScreen}
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
