import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface TabItem {
  key: string;
  label: string;
}

interface TabMenuProps {
  tabs: TabItem[];
  onSelect: (key: string) => void;
  initialKey?: string;
}

export default function TabMenu({ tabs, onSelect, initialKey }: TabMenuProps) {
  const [selectedKey, setSelectedKey] = useState(initialKey || tabs[0].key);

  function handleSelect(key: string) {
    setSelectedKey(key);
    onSelect(key);
  }

  return (
    <View className="flex-row justify-center gap-5 items-center mb-5">
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          onPress={() => handleSelect(tab.key)}
          className="items-center gap-2"
        >
          <Text
            className={`font-bold ${
              selectedKey === tab.key ? "text-blue-500" : "text-neutral-400"
            }`}
          >
            {tab.label}
          </Text>
          <View
            className={`h-0.5 w-14 mt-1 rounded-full ${
              selectedKey === tab.key ? "bg-blue-500" : "bg-transparent"
            }`}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}
