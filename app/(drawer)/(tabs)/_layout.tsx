import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

/**
 * LAYOUT DAS ABAS INFERIORES (TABS NAVIGATION)
 * 
 * Define as 3 abas principais da aplicação:
 * 1. index -> Tela de Câmera / Captura de foto e GPS
 * 2. list  -> Tela da Lista de observações registradas
 * 3. maps  -> Tela do Mapa com os pins (marcadores)
 */
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#16a34a',
        tabBarInactiveTintColor: '#6b7280',
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Câmera',
          tabBarIcon: ({ color, size }) => <MaterialIcons name="photo-camera" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="list"
        options={{
          title: 'Lista',
          tabBarIcon: ({ color, size }) => <MaterialIcons name="format-list-bulleted" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="maps"
        options={{
          title: 'Mapa',
          tabBarIcon: ({ color, size }) => <MaterialIcons name="map" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
