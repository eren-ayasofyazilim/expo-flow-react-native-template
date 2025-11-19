import { useEffect } from "react";
import { ActivityIndicator, BackHandler, View } from "react-native";

export default function LoadingScreen() {
  useEffect(() => {
    const listener = BackHandler.addEventListener("hardwareBackPress", () => {
      return true;
    });
    return () => {
      listener.remove();
    };
  }, []);

  return (
    <View className="absolute bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-gray-50/70">
      <ActivityIndicator size={"large"} color={"#36C2CE"} />
    </View>
  );
}
