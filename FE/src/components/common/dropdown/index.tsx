import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import CloseIcon from "../../../assets/images/icon_dropdown_close.svg";
import OpenIcon from "../../../assets/images/icon_dropdown_open.svg";

interface DropdownProps {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}

function Dropdown({ options, selected, onSelect }: DropdownProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (option: string) => {
    onSelect(option);
    setOpen(false);
  };

  return (
    <View className="relative z-10">
      <TouchableOpacity
        onPress={() => setOpen(!open)}
        className="flex-row items-center justify-between px-4 py-1.5 rounded-md border border-gray-400 bg-white w-36"
        activeOpacity={0.8}
      >
        <Text className="text-base text-neutral-800">{selected}</Text>
        {open ? (
          <OpenIcon width={20} height={20} />
        ) : (
          <CloseIcon width={20} height={20} />
        )}
      </TouchableOpacity>

      {open && (
        <View className="absolute top-10 left-0 right-0 bg-white border border-gray-300 rounded-md w-36">
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              className="px-4 py-2"
              onPress={() => handleSelect(option)}
            >
              <Text
                className={`text-base ${
                  selected === option
                    ? "text-blue-600 font-bold"
                    : "text-neutral-800"
                }`}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

export default Dropdown;
