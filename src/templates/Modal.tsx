import { Ionicons } from "@/components/Ionicons";
import { router } from "expo-router";
import React, { useCallback, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

interface ModalTemplateProps {
  title: string;
  description: string;
  children: React.ReactNode;
  backAction?: () => void;
  action?: {
    onPress: () => void | Promise<void>;
    label: string;
  };
}

export function ModalTemplate({ action, title, description, children, backAction }: ModalTemplateProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = useCallback(() => {
    if (backAction) {
      backAction();
    } else {
      router.back();
    }
  }, [backAction]);

  const handleActionPress = useCallback(async () => {
    if (action) {
      setIsLoading(true);
      try {
        await action.onPress();
      } finally {
        setIsLoading(false);
      }
    }
  }, [action]);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="px-6 pb-6">
        <TouchableOpacity
          onPress={handleBack}
          className="mb-6 border border-gray-500 rounded-full size-10 items-center justify-center"
        >
          <Ionicons name="arrow-back" size={24} color="#6B7280" />
        </TouchableOpacity>
        <Text className="text-3xl font-bold text-gray-900 mb-2">{title}</Text>
        <Text className="text-base text-gray-500">{description}</Text>
      </View>

      <ScrollView className="px-6 flex-1" showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>

      {action && (
        <View className="px-6 pb-8 pt-2">
          <TouchableOpacity
            disabled={isLoading}
            onPress={handleActionPress}
            className={`bg-primary py-4 rounded-full items-center shadow-lg ${isLoading ? "opacity-50" : ""}`}
          >
            <Text className="text-white text-lg font-bold">{action.label}</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
