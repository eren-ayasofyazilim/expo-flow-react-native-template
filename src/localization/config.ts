import enUS from "../localization/en-US.json";
import trTR from "../localization/tr-TR.json";

export const locales = {
  "en-US": {
    code: "en-US",
    countryCode: "us",
    nativeName: "English",
    flag: require("../../assets/flags/us.png"),
    translations: enUS,
  },
  "tr-TR": {
    code: "tr-TR",
    countryCode: "tr",
    nativeName: "Türkçe",
    flag: require("../../assets/flags/tr.png"),
    translations: trTR,
  },
} as const;

export type LocaleCode = keyof typeof locales;

export const availableLocales = locales;

export type TranslationKeys = typeof enUS;

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & string]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & string];

export type TranslationKey = NestedKeyOf<TranslationKeys>;
