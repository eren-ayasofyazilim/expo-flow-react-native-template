import React from "react";
import { TextInput, View, Text } from "react-native";
import { Ionicons, IoniconsTypes } from "./Ionicons";

interface InputProps extends React.ComponentProps<typeof TextInput> {
  title: string;
  iconName: IoniconsTypes;
  rightContent?: React.ReactNode;
}

function Input({ title, iconName, rightContent, ...rest }: InputProps) {
  return (
    <View>
      <Text className="text-lg font-bold text-gray-900 mb-3">{title}</Text>
      <View className="bg-white border-gray-400 rounded-2xl px-4 border py-3 mb-4 flex-row items-center justify-center ">
        <Ionicons name={iconName} size={24} color="#9CA3AF" className="mr-2" />
        <TextInput {...rest} placeholderTextColor="#9ca3af" className="flex-1 text-gray-900" />
        {rightContent}
      </View>
    </View>
  );
}

export default Input;
