import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export const unstable_settings = {
  anchor: '(drawer)',
};

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(drawer)" />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}

// Comandos de inicialização e instalação:
// npx create-expo-app@latest projeto-mobile --template blank-typescript
// npx expo install expo-router @react-navigation/drawer @react-navigation/bottom-tabs react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context expo-constants expo-linking expo-status-bar
// npx expo install expo-camera expo-location react-native-maps @expo/vector-icons
// npx expo install @react-native-async-storage/async-storage
// npm install -D jest jest-expo ts-jest @types/jest @testing-library/react-native @testing-library/jest-native react-test-renderer --legacy-peer-deps
// npx expo start
// npm test

