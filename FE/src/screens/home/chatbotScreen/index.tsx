import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocationStore } from "../../../store/locationStore";
import { CHATBOT_API } from "@env";
import axios from "axios";
import { Send } from "lucide-react-native";
import Header from "../../../components/common/header";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

export default function ChatbotScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "안녕하세요! 낚시에 관한 질문이 있으신가요?",
      isUser: false,
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const { latitude, longitude } = useLocationStore();

  // 채팅 메시지를 서버로 전송하는 함수
  async function sendMessage() {
    if (inputText.trim() === "") return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        CHATBOT_API,
        {
          question: inputText,
          user_lat: latitude,
          user_lon: longitude,
          user_time: new Date().toISOString(),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // axios는 json 자동 파싱되므로 .data로 접근
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.data.answer,
        isUser: false,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "죄송합니다. 메시지 전송 중 오류가 발생했습니다.",
        isUser: false,
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }

  // 새 메시지가 추가될 때마다 스크롤을 아래로 이동
  useEffect(() => {
    if (messages.length > 0 && flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  return (
    <SafeAreaView className="flex-1">
      {/* 헤더 */}
      <Header logo={false} title="낚시 도우미" before={true} />

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 5 }}
        renderItem={({ item }) => (
          <View
            className={`${
              item.isUser ? "bg-blue-500 self-end" : "bg-neutral-100 self-start"
            } max-w-[70%] rounded-xl p-3 mb-2`}
          >
            <Text
              className={`text-sm ${item.isUser ? "text-white" : "text-neutral-800"}`}
            >
              {item.text}
            </Text>
          </View>
        )}
      />

      {isLoading && (
        <View className="self-start bg-gray-200 max-w-[80%] rounded-xl p-3 mb-3 ml-4">
          <ActivityIndicator size="small" color="#3B82F6" />
        </View>
      )}

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <View className="px-5 pt-3 border-t border-neutral-100 flex-row items-center gap-3">
          <TextInput
            className="flex-1 bg-neutral-100 rounded-xl px-4 py-2 text-sm text-neutral-800"
            placeholder="메시지를 입력해 주세요."
            value={inputText}
            onChangeText={setInputText}
            multiline
          />
          <TouchableOpacity
            onPress={sendMessage}
            disabled={inputText.trim() === ""}
          >
            <View
              className={`${
                inputText.trim() === "" ? "opacity-50" : "opacity-100"
              } bg-blue-500 rounded-full p-2`}
            >
              <Send size={20} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
