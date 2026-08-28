import { Drawer } from 'expo-router/drawer';

/**
 * LAYOUT DO DRAWER (MENU LATERAL)
 * 
 * Regra do Expo Router: O arquivo DEVE se chamar `_layout.tsx` (no singular).
 * Configura o menu lateral contendo a rota principal `(tabs)`.
 */
export default function DrawerLayout() {
    return (
        <Drawer
            screenOptions={{
                headerShown: true,
                headerTitle: 'EcoField',
                drawerActiveTintColor: '#16a34a',
            }}
        >
            <Drawer.Screen
                name='(tabs)'
                options={{
                    drawerLabel: 'Painel Principal',
                    title: 'EcoField'
                }}
            />
        </Drawer>
    );
}
