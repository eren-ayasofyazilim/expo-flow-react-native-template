import Button from "@/components/Button";
import Input from "@/components/Input";
import { Ionicons } from "@/components/Ionicons";
import { useLocalization } from "@/providers/LocalizationProvider";
import { useSession } from "@/providers/SessionProvider";
import { ModalTemplate } from "@/templates/Modal";
import { Link } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export function RegisterScreen() {
  const { signIn } = useSession();
  const { t } = useLocalization();
  const [showPassword, setShowPassword] = useState(false);
  return (
    <ModalTemplate title={t("Auth.Register.Title")} description={t("Auth.Register.Description")}>
      <Input
        placeholder={t("Auth.Register.Full Name")}
        title={t("Auth.Register.Full Name")}
        iconName="person-outline"
        autoCapitalize="words"
      />
      <Input
        placeholder={t("Auth.Register.Email")}
        title={t("Auth.Register.Email")}
        iconName="mail-outline"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Input
        placeholder={t("Auth.Register.Password")}
        title={t("Auth.Register.Password")}
        iconName="lock-closed-outline"
        secureTextEntry={!showPassword}
        className="mt-4"
        rightContent={
          <TouchableOpacity onPressIn={() => setShowPassword(true)} onPressOut={() => setShowPassword(false)}>
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={24}
              color="#9CA3AF"
              className="mr-2"
            />
          </TouchableOpacity>
        }
      />

      <Button
        action={{ onPress: () => signIn(), label: t("Auth.Register.Register Button") }}
        isLoading={false}
        containerClassName="mt-8 bg-black"
      />
      <View className="flex-row gap-3 items-center justify-center my-8">
        <View className="flex-1 border-t border-gray-300" />
        <Text className="font-light">{t("Auth.Register.Or")}</Text>
        <View className="flex-1 border-t border-gray-300" />
      </View>
      <View className="flex-row gap-3 mb-8">
        <Button
          iconName="logo-google"
          iconColor="#000"
          action={{ onPress: () => signIn(), label: t("Auth.Register.Register with Google") }}
          isLoading={false}
          containerClassName="bg-white flex-1"
          textClassName="text-black font-light text-sm"
        />
        <Button
          iconName="logo-apple"
          iconColor="#000"
          action={{ onPress: () => signIn(), label: t("Auth.Register.Register with Apple") }}
          isLoading={false}
          containerClassName="bg-white flex-1"
          textClassName="text-black font-light text-sm"
        />
      </View>
      <View className="border-gray-300 mx-4 flex-row gap-1 justify-center mb-6">
        <Text className="font-light">{t("Auth.Register.Have Account")}</Text>
        <Link href="/login" className="font-medium">
          {t("Auth.Register.Login")}
        </Link>
      </View>
    </ModalTemplate>
  );
}
