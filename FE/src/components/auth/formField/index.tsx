import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Eye, EyeOff } from "lucide-react-native";
import ErrorMessage from "../../common/errorMessage";

interface FormFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  placeholder: string;
  secure?: boolean;
  toggleSecure?: () => void;
  showSecureToggle?: boolean;
  hasButton?: boolean;
  onButtonPress?: () => void;
  buttonLabel?: string;
  buttonDisabled?: boolean;
}

export default function FormField({
  label,
  value,
  onChangeText,
  error,
  placeholder,
  secure = false,
  toggleSecure,
  showSecureToggle = false,
  hasButton = false,
  onButtonPress,
  buttonLabel = "",
  buttonDisabled = false,
}: FormFieldProps) {
  return (
    <View className="relative">
      <Text className="text-neutral-800 font-semibold">{label}</Text>
      <View className="flex-row items-center gap-2">
        {/* 입력창 */}
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#A3A3A3"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secure}
          className="flex-1 px-3 py-2 text-sm text-neutral-800 border-b border-neutral-100"
        />

        {/* 중복 확인 버튼 */}
        {hasButton && (
          <TouchableOpacity
            onPress={onButtonPress}
            disabled={buttonDisabled}
            className={`px-3 py-2 rounded-lg border ${
              buttonDisabled ? "border-neutral-300" : "border-blue-500"
            }`}
          >
            <Text
              className={`text-sm ${
                buttonDisabled ? "text-neutral-300" : "text-blue-500"
              }`}
            >
              {buttonLabel}
            </Text>
          </TouchableOpacity>
        )}

        {/* 비밀번호 활성화 버튼 */}
        {showSecureToggle && toggleSecure && (
          <TouchableOpacity
            onPress={toggleSecure}
            className="absolute top-4 right-5"
          >
            {secure ? (
              <Eye color="#A3A3A3" size={20} />
            ) : (
              <EyeOff color="#A3A3A3" size={20} />
            )}
          </TouchableOpacity>
        )}
      </View>
      {error && <ErrorMessage content={error} />}
    </View>
  );
}
