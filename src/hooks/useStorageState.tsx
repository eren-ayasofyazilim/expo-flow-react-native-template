import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { useCallback, useEffect, useReducer } from "react";

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

function useAsyncState<T>(initialValue: [boolean, T | null] = [true, null]): UseStateHook<T> {
  return useReducer((_, value: T | null) => [false, value] as [boolean, T | null], initialValue) as UseStateHook<T>;
}

export async function setStorageItemAsync(key: string, value: string | null, secured?: boolean) {
  if (!secured) {
    if (value === null) {
      await AsyncStorage.removeItem(key);
    } else {
      await AsyncStorage.setItem(key, value);
    }
  } else {
    if (value == null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  }
}

export function useStorageState(key: string, secured?: boolean): UseStateHook<string> {
  const [state, setState] = useAsyncState<string>();

  useEffect(() => {
    if (!secured) {
      AsyncStorage.getItem(key).then((value: string | null) => {
        setState(value);
      });
      return;
    }
    SecureStore.getItemAsync(key).then((value: string | null) => {
      setState(value);
    });
  }, [key]);

  const setValue = useCallback(
    (value: string | null) => {
      setState(value);
      setStorageItemAsync(key, value, secured);
    },
    [key]
  );

  return [state, setValue];
}
