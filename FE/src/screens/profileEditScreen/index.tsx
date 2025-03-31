import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IconEdit from "../../assets/images/icon_edit.svg";
import IconEyeClose from "../../assets/images/icon_eye_close.svg";
import IconEyeOpen from "../../assets/images/icon_eye_open.svg";
import Button from "../../components/common/Button";
import { HeaderBeforeLogo } from "../../components/common/headerBeforeLogo";
import userData from "../../mocks/userMocks.json";

export function ProfileEditScreen() {
  const navigation = useNavigation();
  const user = userData[0];
  const [isSecure1, setIsSecure1] = useState(true);
  const [isSecure2, setIsSecure2] = useState(true);

  return (
    <SafeAreaView edges={["top"]} className="flex-1">
      <HeaderBeforeLogo />
      <View className="bg-blue-50 flex-1 mx-5 my-5 rounded-2xl items-center">
        <Image
          source={{ uri: user.profile_img }}
          className="w-24 h-24 my-6 rounded-full mt-7"
        />
        <View className="flex-row">
          <Text className="text-xl font-bold text-neutral-800 mr-1">
            {user.nickname}
          </Text>
          <IconEdit />
        </View>

        <View className="flex w-full mt-5">
          <View className="flex w-full px-7 mb-3">
            <Text className="font-bold text-neutral-800">이메일</Text>
            <TextInput
              placeholder={user.email}
              className="border-b-2 border-b-neutral-300 py-3 w-full"
            />
          </View>
          <View className="flex w-full px-7 mb-3">
            <Text className="font-bold text-neutral-800">이름</Text>
            <TextInput
              placeholder={user.name}
              className="border-b-2 border-b-neutral-300 py-3 w-full"
            />
          </View>
          <View className="flex w-full px-7 mb-3">
            <Text className="font-bold text-neutral-800">전화번호</Text>
            <TextInput
              placeholder={user.phone__number}
              className="border-b-2 border-b-neutral-300 py-3 w-full"
            />
          </View>
          <View className="flex w-full px-7 mb-3">
            <Text className="font-bold text-neutral-800">비밀번호</Text>
            <View className="w-full flex-row items-center border-b-2 border-b-neutral-300">
              <TextInput
                placeholder={user.password}
                className="flex-1 py-2"
                secureTextEntry={isSecure1}
              />
              <TouchableOpacity onPress={() => setIsSecure1(!isSecure1)}>
                {isSecure1 ? <IconEyeClose /> : <IconEyeOpen />}
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex w-full px-7 mb-3">
            <Text className="font-bold text-neutral-800">비밀번호 확인</Text>
            <View className="w-full flex-row items-center border-b-2 border-b-neutral-300">
              <TextInput
                placeholder={user.password}
                className="flex-1 py-2"
                secureTextEntry={isSecure2}
              />
              <TouchableOpacity onPress={() => setIsSecure2(!isSecure1)}>
                {isSecure2 ? <IconEyeClose /> : <IconEyeOpen />}
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View className="flex-row justify-between w-full px-10 mt-5">
          <Button
            title="취소"
            type="line"
            onPress={() => navigation.goBack()}
          />
          <Button title="저장" type="default" />
        </View>
      </View>
    </SafeAreaView>
  );
}
