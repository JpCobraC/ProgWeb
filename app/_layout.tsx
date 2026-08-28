/* ============================================================================
   📌 GUIA DE COMANDOS PARA PROVA / PROJETO EXPO (CLEAN ARCHITECTURE)
   ============================================================================
   1. CRIAR O PROJETO (DO ZERO):
      npx create-expo-app@latest projeto-mobile --template blank-typescript
      cd projeto-mobile

   2. INSTALAÇÃO DE PACOTES E DEPENDÊNCIAS:
      # Roteamento, Drawer, Tabs e Animações:
      npx expo install expo-router @react-navigation/drawer @react-navigation/bottom-tabs react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context expo-constants expo-linking expo-status-bar

      # Câmera, Geolocalização (GPS), Mapas e Ícones:
      npx expo install expo-camera expo-location react-native-maps @expo/vector-icons

      # Armazenamento Local Persistente (AsyncStorage):
      npx expo install @react-native-async-storage/async-storage

      # Testes Unitários (Jest):
      npm install -D jest jest-expo ts-jest @types/jest @testing-library/react-native @testing-library/jest-native react-test-renderer --legacy-peer-deps

   3. COMANDOS DE EXECUÇÃO:
      # Iniciar Dev Server:
      npx expo start

      # Iniciar no Android / iOS / Web:
      npx expo start --android
      npx expo start --ios
      npx expo start --web

      # Rodar Testes Unitários:
      npm test

      # Iniciar limpando cache:
      npx expo start -c
   ============================================================================ */

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
