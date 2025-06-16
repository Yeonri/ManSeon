import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RecordStackParams } from "../types";
import AddRecordScreen from "../../screens/camera/addRecordScreen";
import RecordDetailScreen from "../../screens/camera/recordDetailScreen";
import RecordScreen from "../../screens/camera/recordScreen";

const Stack = createNativeStackNavigator<RecordStackParams>();

export function RecordStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* 낚시 기록 전체*/}
      <Stack.Screen name="Record" component={RecordScreen} />

      {/* 낚시 기록 상세 */}
      <Stack.Screen name="RecordDetail" component={RecordDetailScreen} />

      {/* 낚시 기록 추가 */}
      <Stack.Screen name="AddRecord" component={AddRecordScreen} />
    </Stack.Navigator>
  );
}
