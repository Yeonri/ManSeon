import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import noticeList from "../../../data/noticeList";

export function NoticeList() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <View className="bg-blue-50 rounded-xl p-3 mx-4">
      <Text className="font-bold text-lg mb-3 text-black">공지사항</Text>

      <ScrollView
        className="max-h-64"
        showsVerticalScrollIndicator
        nestedScrollEnabled
      >
        {noticeList.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => toggleExpand(item.id)}
            activeOpacity={0.8}
            className="mb-3"
          >
            <View className="flex-row items-start gap-2 mb-1">
              <Image
                source={require("../../../assets/images/icon_notice.png")}
                className="w-5 h-5 mt-0.5"
                resizeMode="contain"
              />
              <Text className="text-sm font-semibold text-black flex-1">
                {item.title}
              </Text>
            </View>

            <Text
              numberOfLines={expandedId === item.id ? undefined : 1}
              className="text-sm text-neutral-500 max-w-[95%]"
            >
              {item.content}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
