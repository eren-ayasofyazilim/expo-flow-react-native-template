import { useSession } from "@/providers/SessionProvider";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export function SplashScreenController() {
  const { isLoading: isSessionLoading } = useSession();

  useEffect(() => {
    if (!isSessionLoading) {
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 2000);
    }
  }, [isSessionLoading]);

  return null;
}
