import React from "react";
import { Pressable, View, Text } from "react-native";
import { Ionicons, IoniconsTypes } from "./Ionicons";
import { cn } from "@/utils/cn";

export interface ActionItemProps {
  title: string;
  icon: IoniconsTypes;
  onPress: () => void;
  disabled?: boolean;
}

export interface ActionListProps {
  title: string;
  menuItems: ActionItemProps[];
}

function ActionList({ title, menuItems }: ActionListProps) {
  return (
    <View>
      <View className="border-t border-x px-4 py-4 rounded-t-3xl border-gray-200 bg-white overflow-hidden">
        <Text className="text-lg font-medium">{title}</Text>
      </View>

      <View className="bg-white rounded-b-3xl overflow-hidden border border-gray-200">
        {menuItems.map((item, index) => (
          <React.Fragment key={item.title}>
            <Pressable
              onPress={item.onPress}
              disabled={item.disabled}
              className={cn("flex-row items-center px-4 py-4 active:bg-gray-50", item.disabled && "opacity-50")}
            >
              <View className={`w-12 h-12 rounded-full bg-gray-100 items-center justify-center mr-4`}>
                <Ionicons name={item.icon} size={24} color="black" />
              </View>

              <Text className="flex-1 text-base font-medium">{item.title}</Text>

              <Ionicons name="chevron-forward" size={20} color="#999" />
            </Pressable>

            {index < menuItems.length - 1 && <View className="h-[1px] bg-gray-100" />}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
}

export default ActionList;
