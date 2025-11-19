import { useLocalization } from "@/providers/LocalizationProvider";
import TabPage from "@/templates/TabPage";
import React from "react";
import { Text } from "react-native";

export default function Page() {
  const { t } = useLocalization();
  return (
    <TabPage title={t("Home.Title")}>
      <Text>{t("Home.Guest")}</Text>
    </TabPage>
  );
}
