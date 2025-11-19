import { LocaleCode, locales } from "@/localization/config";

export function getNestedValue(obj: unknown, path: string): string | undefined {
  return path.split(".").reduce<any>((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return acc[key];
    }
    return undefined;
  }, obj);
}

export function findBestLocaleAvailable(locale: string): LocaleCode {
  if (locale in locales) return locale as LocaleCode;

  const languagePart = locale.split("-")[0];

  const matched = (Object.keys(locales) as LocaleCode[]).find((loc) => loc.startsWith(languagePart));

  return matched ?? "en-US";
}
