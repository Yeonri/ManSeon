import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, View } from "react-native";

type MoreStackList = {
  More: undefined;
  Tutorial: undefined;
};

type Props = NativeStackScreenProps<MoreStackList, "More">;

export function MoreScreen({ navigation }: Props) {
  return (
    <View>
      <Button
        title="튜토리얼"
        onPress={() => navigation.navigate("Tutorial")}
      />
    </View>
  );
}
