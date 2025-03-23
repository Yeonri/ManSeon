import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, View } from "react-native";

type MoreStackList = {
  More: undefined;
  Tutorial: undefined;
  Prohibited: undefined;
};

type Props = NativeStackScreenProps<MoreStackList, "More">;

export function MoreScreen({ navigation }: Props) {
  return (
    <View>
      <Button
        title="튜토리얼"
        onPress={() => navigation.navigate("Tutorial")}
      />
      <Button
        title="금어기"
        onPress={() => navigation.navigate("Prohibited")}
      />
    </View>
  );
}
