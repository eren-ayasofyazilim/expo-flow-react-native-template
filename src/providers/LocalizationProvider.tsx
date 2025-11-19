import { LocaleCode, locales, TranslationKey } from "@/localization/config";
import { findBestLocaleAvailable, getNestedValue } from "@/utils/localization";
import { useLocales } from "expo-localization";
import { createContext, use, useCallback, useEffect, useMemo, type PropsWithChildren } from "react";
import { useStorageState } from "@/hooks/useStorageState";

const LocalizationContext = createContext<{
  t: (key: TranslationKey) => string;
  changeLocale: (newLocale: LocaleCode) => void;
  activeLocale: LocaleCode;
}>({
  t: () => "",
  changeLocale: () => {},
  activeLocale: "en-US",
});

export function useLocalization() {
  const value = use(LocalizationContext);
  if (!value) {
    throw new Error("useLocalization must be wrapped in a <LocalizationProvider />");
  }
  return value;
}

export function LocalizationProvider({ children }: PropsWithChildren) {
  const [[isLoading, storedLocale], setStoredLocale] = useStorageState("locale");
  const deviceLocale = useLocales()[0]?.languageTag ?? "en-US";

  const activeLocale = useMemo<LocaleCode>(() => {
    return storedLocale ? (storedLocale as LocaleCode) : findBestLocaleAvailable(deviceLocale);
  }, [storedLocale, deviceLocale]);

  const translations = useMemo(() => locales[activeLocale].translations, [activeLocale]);

  useEffect(() => {
    if (!isLoading && !storedLocale) {
      setStoredLocale(activeLocale);
    }
  }, [isLoading, storedLocale, activeLocale]);

  const t = useCallback(
    (key: TranslationKey): string => {
      const result = getNestedValue(translations, key);

      if (result !== undefined) return result;

      const fallback = getNestedValue(locales["en-US"].translations, key);
      return fallback ?? key;
    },
    [translations]
  );

  const changeLocale = useCallback((newLocale: LocaleCode) => setStoredLocale(newLocale), []);

  if (isLoading) return null;

  return (
    <LocalizationContext.Provider
      value={{
        t,
        changeLocale,
        activeLocale,
      }}
    >
      {children}
    </LocalizationContext.Provider>
  );
}
