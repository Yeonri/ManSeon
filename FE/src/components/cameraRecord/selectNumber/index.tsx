import React, { useState } from "react";
import { View, TextInput, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { ChevronUp, ChevronDown } from "lucide-react-native";

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

  const scaleUp = useSharedValue(1);
  const scaleDown = useSharedValue(1);

  const handleChange = (direction: "up" | "down") => {
    const nextValue = direction === "up" ? value + 1 : value - 1;
    const withinRange = direction === "up" ? value < max : value > min;

    if (!withinRange) return;

    setValue(nextValue);
    setInput(nextValue.toString());
    onChange?.(nextValue);

    const anim = direction === "up" ? scaleUp : scaleDown;
    anim.value = withSpring(1.2, { damping: 8 }, () => {
      anim.value = withSpring(1);
    });
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

  const upStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleUp.value }],
  }));

  const downStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleDown.value }],
  }));

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
          <Animated.View style={upStyle}>
            <ChevronUp size={28} color="#2B7FFF" strokeWidth={3} />
          </Animated.View>
        </Pressable>
        <Pressable onPress={() => handleChange("down")}>
          <Animated.View style={downStyle}>
            <ChevronDown size={30} color="#2B7FFF" strokeWidth={3} />
          </Animated.View>
        </Pressable>
      </View>
    </View>
  );
}
