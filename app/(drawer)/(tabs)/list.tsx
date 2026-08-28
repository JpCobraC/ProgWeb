import { Observation } from "@/src/domain/entities/Observation";
import { container } from "@/src/factories/container";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

export default function ListScreen() {
    const [list, setList] = useState<Observation[]>([]);
    const [loading, setLoading] = useState(true);

    const loadObservations = useCallback(async () => {
        setLoading(true);
        try {
            const data = await container.listObservations.execute();
            setList(data);
        } catch (err) {
            console.error("Erro ao carregar observações:", err);
            Alert.alert("Erro", "Não foi possível carregar a lista de observações.");
        } finally {
            setLoading(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            loadObservations();
        }, [loadObservations])
    );

    const handleDelete = (id: string) => {
        Alert.alert(
            "Excluir Observação",
            "Deseja realmente remover esta observação?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Excluir",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await container.deleteObservation.execute(id);
                            loadObservations();
                        } catch (err) {
                            Alert.alert("Erro", "Não foi possível excluir.");
                        }
                    }
                }
            ]
        );
    };

    const formatDate = (date: Date) => {
        try {
            const d = new Date(date);
            return d.toLocaleDateString("pt-BR") + " " + d.toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' });
        } catch {
            return "";
        }
    };

    const renderItem = ({ item }: { item: Observation }) => {
        return (
            <View style={styles.card}>
                <Image source={{ uri: item.photo }} style={styles.thumbnail} resizeMode="cover" />
                
                <View style={styles.cardContent}>
                    <View style={styles.locationRow}>
                        <MaterialIcons name="location-on" size={18} color="#16a34a" />
                        <Text style={styles.coordinatesText}>
                            Lat: {item.coordinates.latitude.toFixed(5)}, Long: {item.coordinates.longitude.toFixed(5)}
                        </Text>
                    </View>

                    {item.description ? (
                        <Text style={styles.descriptionText}>{item.description}</Text>
                    ) : null}

                    <Text style={styles.dateText}>
                        {item.createdAt ? formatDate(item.createdAt) : ''}
                    </Text>
                </View>

                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
                    <MaterialIcons name="delete-outline" size={24} color="#ef4444" />
                </TouchableOpacity>
            </View>
        );
    };

    if (loading && list.length === 0) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#16a34a" />
                <Text style={styles.loadingText}>Carregando observações...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {list.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <MaterialIcons name="photo-camera" size={64} color="#d1d5db" />
                    <Text style={styles.emptyTitle}>Nenhuma observação ainda</Text>
                    <Text style={styles.emptySubtitle}>Use a aba Câmera para capturar o seu primeiro registro no campo.</Text>
                </View>
            ) : (
                <FlatList
                    data={list}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                    refreshing={loading}
                    onRefresh={loadObservations}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f4f6f8",
    },
    centerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    loadingText: {
        marginTop: 12,
        fontSize: 14,
        color: "#6b7280",
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 32,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#374151",
        marginTop: 16,
    },
    emptySubtitle: {
        fontSize: 14,
        color: "#9ca3af",
        textAlign: "center",
        marginTop: 8,
    },
    listContent: {
        padding: 16,
        gap: 12,
    },
    card: {
        flexDirection: "row",
        backgroundColor: "#ffffff",
        borderRadius: 16,
        padding: 12,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
    },
    thumbnail: {
        width: 80,
        height: 80,
        borderRadius: 12,
        backgroundColor: "#e5e7eb",
    },
    cardContent: {
        flex: 1,
        marginLeft: 12,
        justifyContent: "center",
    },
    locationRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 4,
    },
    coordinatesText: {
        fontSize: 13,
        fontWeight: "600",
        color: "#1f2937",
        marginLeft: 4,
    },
    descriptionText: {
        fontSize: 13,
        color: "#4b5563",
        marginBottom: 4,
    },
    dateText: {
        fontSize: 12,
        color: "#9ca3af",
    },
    deleteButton: {
        padding: 8,
    },
});
