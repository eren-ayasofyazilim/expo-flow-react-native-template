import "../global.css";
import { SplashScreenController } from "@/features/SplashScreenController";
import { SessionProvider, useSession } from "@/providers/SessionProvider";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LocalizationProvider } from "@/providers/LocalizationProvider";

export default function Layout() {
  return (
    <GestureHandlerRootView>
      <StatusBar translucent={true} />
      <BottomSheetModalProvider>
        <SessionProvider>
          <LocalizationProvider>
            <SplashScreenController />
            <RootNavigator />
          </LocalizationProvider>
        </SessionProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

function RootNavigator() {
  const { session } = useSession();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>

      <Stack.Protected guard={!session}>
        <Stack.Screen name="(public)" />
      </Stack.Protected>
    </Stack>
  );
}
