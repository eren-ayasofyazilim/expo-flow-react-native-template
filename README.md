# 🚀 ExpoFlow

> Modern Expo React Native quickstart template with Expo Router, authentication, localization, and beautiful UI components

ExpoFlow provides a solid foundation for building cross-platform mobile applications with best practices, pre-configured authentication flows and multi-language support.

## ✨ Features

### 🎯 Core Features

- **📱 Expo Router** - File-based routing with protected routes
- **🔐 Authentication System** - Pre-built authentication flows (login/register) with session management
- **🌍 Multi-language Support** - i18n implementation with English and Turkish translations
- **🎨 Modern UI Components** - Beautiful, reusable components styled with NativeWind (Tailwind CSS)
- **💾 Secure Storage** - Expo SecureStore for sensitive data management
- **🗂️ State Management** - Zustand for global state management
- **🎭 Bottom Sheets** - @gorhom/bottom-sheet integration for modals

### 🏗️ Architecture & Structure

- **TypeScript** - Full type safety across the application
- **NativeWind v4** - Tailwind CSS for React Native
- **Expo Router v6** - Latest file-based routing
- **React 19** - Latest React features
- **Protected Routes** - Route guards based on authentication state
- **Custom Hooks** - Reusable hooks (useDebounce, useStorageState)
- **Provider Pattern** - SessionProvider, LocalizationProvider

## 📦 Tech Stack

| Technology              | Version | Purpose                |
| ----------------------- | ------- | ---------------------- |
| React Native            | 0.81.5  | Mobile framework       |
| React                   | 19.1.0  | UI library             |
| Expo                    | ^54.0.1 | Development platform   |
| Expo Router             | ~6.0.0  | File-based routing     |
| TypeScript              | ~5.9.2  | Type safety            |
| NativeWind              | ^4.0.1  | Styling (Tailwind CSS) |
| Zustand                 | ^5.0.8  | State management       |
| React Native Reanimated | ~4.1.0  | Animations             |
| @gorhom/bottom-sheet    | ^5.2.6  | Bottom sheets          |

## 📁 Project Structure

```
src/
├── app/                    # Expo Router pages
│   ├── _layout.tsx        # Root layout with providers
│   ├── (auth)/            # Protected authenticated routes
│   ├── (public)/          # Public routes (login, register, onboarding)
│   └── (modals)/          # Modal screens
├── components/            # Reusable UI components
│   ├── *
├── providers/             # React Context providers
│   ├── SessionProvider.tsx      # Authentication state
│   └── LocalizationProvider.tsx # Language state
├── hooks/                 # Custom React hooks
│   ├── useStorageState.tsx     # Secure storage hook
│   └── useDebounce.tsx         # Debounce hook
├── store/                 # Zustand stores
│   └── user.ts           # User state management
├── localization/         # i18n configuration
│   ├── config.ts         # Language configuration
│   ├── en-US.json        # English translations
│   └── tr-TR.json        # Turkish translations
├── screens/              # Screen components
├── templates/            # Layout templates
│   ├── Modal.tsx         # Modal template
│   └── TabPage.tsx       # Tab page template
├── feats/                # Feature components
│   └── SplashScreenController.tsx
└── utils/                # Utility functions
    ├── cn.ts             # Tailwind class merger
    └── localization.ts   # Localization helpers
```

## 🌍 Localization

Multi-language support with easy-to-use translation system:

### Adding a New Language

1. Create translation file: `src/localization/xx-XX.json`
2. Add language config in `src/localization/config.ts`
3. Add flag icon to `assets/flags/`

### Using Translations

```tsx
import { useLocalization } from "@/providers/LocalizationProvider";

function MyComponent() {
  const { t } = useLocalization();

  return <Text>{t("Home.Title")}</Text>;
}
```

### Custom Theme Colors

- `primary`: #fd525c (Coral Red)
- `midnight`: #121063 (Dark Blue)

Extend theme in `tailwind.config.js` for more custom colors.

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest features
- Submit pull requests

## 📄 License

This project is open source and available for use in your projects.

Start building your next amazing mobile app with ExpoFlow! 🚀
