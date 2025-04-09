import { ChevronDown, ChevronUp } from "lucide-react-native";
import React, { useState } from "react";
import { Pressable, TextInput, View } from "react-native";

interface Props {
  initial?: number;
  onChange?: (val: number) => void;
}

export function SelectNumber({ initial = 10, onChange }: Props) {
  const min = 1;
  const max = 99;

  const [value, setValue] = useState(
    Math.min(Math.max(initial ?? 10, min), max)
  );
  const [input, setInput] = useState(value.toString());

  const handleChange = (direction: "up" | "down") => {
    const nextValue = direction === "up" ? value + 1 : value - 1;
    const withinRange = direction === "up" ? value < max : value > min;

    if (!withinRange) return;

    setValue(nextValue);
    setInput(nextValue.toString());
    onChange?.(nextValue);
  };

  const handleInputBlur = () => {
    const numeric = parseInt(input, 10);
    if (!isNaN(numeric)) {
      const clamped = Math.max(min, Math.min(numeric, max));
      setValue(clamped);
      setInput(clamped.toString());
      onChange?.(clamped);
    } else {
      setInput(value.toString());
    }
  };

  return (
    <View className="flex-row items-center bg-blue-50 rounded-3xl p-2">
      <TextInput
        className="mx-4 text-3xl text-blue-500 font-bold text-center w-12"
        keyboardType="numeric"
        value={input}
        onChangeText={setInput}
        onBlur={handleInputBlur}
        maxLength={2}
        returnKeyType="done"
      />
      <View>
        <Pressable onPress={() => handleChange("up")}>
          <View>
            <ChevronUp size={28} color="#2B7FFF" strokeWidth={3} />
          </View>
        </Pressable>
        <Pressable onPress={() => handleChange("down")}>
          <View>
            <ChevronDown size={30} color="#2B7FFF" strokeWidth={3} />
          </View>
        </Pressable>
      </View>
    </View>
  );
}
