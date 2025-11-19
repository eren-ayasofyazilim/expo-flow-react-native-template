import Button from "@/components/Button";
import Input from "@/components/Input";
import { Ionicons } from "@/components/Ionicons";
import { useLocalization } from "@/providers/LocalizationProvider";
import { useSession } from "@/providers/SessionProvider";
import { ModalTemplate } from "@/templates/Modal";
import { Link } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export function LoginScreen() {
  const { signIn } = useSession();
  const { t } = useLocalization();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <ModalTemplate title={t("Auth.Login.Title")} description={t("Auth.Login.Description")}>
      <Input
        placeholder={t("Auth.Login.Email")}
        title={t("Auth.Login.Email")}
        iconName="mail-outline"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Input
        placeholder={t("Auth.Login.Password")}
        title={t("Auth.Login.Password")}
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
      <Text className="text-right font-bold text-sm">{t("Auth.Login.Forgot Password")}</Text>

      <Button
        action={{
          onPress: () => {
            signIn();
          },
          label: t("Auth.Login.Login Button"),
        }}
        isLoading={false}
        containerClassName="mt-8 bg-black"
      />
      <View className="flex-row gap-3 items-center justify-center my-8">
        <View className="flex-1 border-t border-gray-300" />
        <Text className="font-light">{t("Auth.Login.Or")}</Text>
        <View className="flex-1 border-t border-gray-300" />
      </View>
      <View className="flex-row gap-3 mb-8">
        <Button
          iconName="logo-google"
          iconColor="#000"
          action={{ onPress: () => signIn(), label: t("Auth.Login.Login with Google") }}
          isLoading={false}
          containerClassName="bg-white flex-1"
          textClassName="text-black font-light text-sm"
        />
        <Button
          iconName="logo-apple"
          iconColor="#000"
          action={{ onPress: () => signIn(), label: t("Auth.Login.Login with Apple") }}
          isLoading={false}
          containerClassName="bg-white flex-1"
          textClassName="text-black font-light text-sm"
        />
      </View>
      <View className="border-gray-300 mx-4 flex-row gap-1 justify-center mb-6">
        <Text className="font-light">{t("Auth.Login.No Account")}</Text>
        <Link href="/register" className="font-medium">
          {t("Auth.Login.Create Account")}
        </Link>
      </View>
    </ModalTemplate>
  );
}
