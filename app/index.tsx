import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        router.replace('/(drawer)/(tabs)');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.card}>
                    <View style={styles.logoContainer}>
                        <View style={styles.logoCircle}>
                            <Ionicons name="leaf" size={32} color="#ffffff" />
                        </View>
                    </View>
                    <Text style={styles.title}>EcoField</Text>
                    <Text style={styles.subtitle}>Sistema de Monitoramento de Campo</Text>
                    
                    <Text style={styles.label}>E-mail</Text>
                    <View style={styles.inputContainer}>
                        <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
                        <TextInput
                            placeholder="seu@email.com"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={setEmail}
                            style={styles.input}
                        />
                    </View>
                    
                    <Text style={styles.label}>Senha</Text>
                    <View style={styles.inputContainer}>
                        <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
                        <TextInput
                            placeholder="********"
                            secureTextEntry={true}
                            autoCapitalize="none"
                            value={password}
                            onChangeText={setPassword}
                            style={styles.input}
                        />
                    </View>
                    
                    <TouchableOpacity onPress={handleLogin} style={styles.button}>
                        <Text style={styles.buttonText}>ENTRAR</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#f0f2f5",
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    card: {
        backgroundColor: "#ffffff",
        width: "100%",
        maxWidth: 380,
        borderRadius: 20,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    logoContainer: {
        alignItems: "center",
        marginBottom: 12,
    },
    logoCircle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: "#16a34a",
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        color: "#1f2937",
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 14,
        color: '#6b7280',
        textAlign: 'center',
        marginBottom: 24,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 6,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        backgroundColor: '#f9fafb',
        borderRadius: 12,
        marginBottom: 16
    },
    inputIcon: {
        paddingLeft: 14
    },
    input: {
        flex: 1,
        paddingVertical: 14,
        paddingHorizontal: 10,
        color: '#1f2937',
        fontSize: 16,
    },
    button: {
        backgroundColor: '#16a34a',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 8,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "700",
        color: '#ffffff',
        letterSpacing: 1.2
    }
});