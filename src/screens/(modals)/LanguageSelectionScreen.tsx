import Input from "@/components/Input";
import { Ionicons } from "@/components/Ionicons";
import { availableLocales, LocaleCode } from "@/localization/config";
import { useLocalization } from "@/providers/LocalizationProvider";
import { ModalTemplate } from "@/templates/Modal";
import { router } from "expo-router";
import React, { useCallback, useState } from "react";
import { Image, ImageSourcePropType, ScrollView, Text, TouchableOpacity, View } from "react-native";

interface LanguageItemProps {
  code: string;
  info: { nativeName: string; flag: ImageSourcePropType };
  isActive: boolean;
  onPress: () => void;
  showCheckmark?: boolean;
}

const LanguageItem = React.memo<LanguageItemProps>(
  ({ info, isActive, onPress, showCheckmark = true }) => (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={`bg-white rounded-2xl px-4 py-3 mb-3 flex-row items-center border-2 ${
        isActive ? "border-primary" : "border-gray-200"
      }`}
    >
      <Image source={info.flag} style={{ width: 40, height: 40, borderRadius: 20 }} resizeMode="cover" />
      <Text className={`ml-4 text-base font-medium flex-1 ${isActive ? "text-gray-900" : "text-gray-700"}`}>
        {info.nativeName}
      </Text>
      {isActive && showCheckmark && (
        <View className="items-center justify-center">
          <Ionicons name="checkmark-circle" size={24} color="#fd525c" />
        </View>
      )}
    </TouchableOpacity>
  ),
  (prevProps, nextProps) => prevProps.code === nextProps.code && prevProps.isActive === nextProps.isActive
);

export function LanguageSelectionScreen() {
  const { activeLocale, changeLocale, t } = useLocalization();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLocales = Object.entries(availableLocales).filter(([_, info]) =>
    info.nativeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedLocale = availableLocales[activeLocale];

  const handleLocaleChange = useCallback(
    (code: string) => {
      changeLocale(code as LocaleCode);
    },
    [changeLocale]
  );

  return (
    <ModalTemplate
      title={t("Language.Choose the language")}
      description={t("Language.Select your preferred language below This helps us serve you better.")}
      action={{
        label: t("Language.Continue"),
        onPress: () => router.back(),
      }}
    >
      <Text className="text-lg font-bold text-gray-900 mb-3">{t("Language.You Selected")}</Text>
      <LanguageItem
        code={activeLocale}
        info={selectedLocale}
        isActive={true}
        onPress={() => {}}
        showCheckmark={false}
      />
      <View className="flex-1">
        <Input
          iconName="search"
          value={searchQuery}
          title={t("Language.All Languages")}
          placeholder={t("Language.Search")}
          onChangeText={setSearchQuery}
        />

        <ScrollView className="flex-1" bounces={false} showsVerticalScrollIndicator={false}>
          {filteredLocales.map(([code, info]) => (
            <LanguageItem
              key={code}
              code={code}
              info={info}
              isActive={activeLocale === code}
              onPress={() => handleLocaleChange(code)}
            />
          ))}
        </ScrollView>
      </View>
    </ModalTemplate>
  );
}
