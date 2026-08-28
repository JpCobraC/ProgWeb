import { Observation } from '@/src/domain/entities/Observation';
import { container } from '@/src/factories/container';
import * as Location from 'expo-location';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, StyleSheet, Text, View } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';

export default function MapsScreen() {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [observations, setObservations] = useState<Observation[]>([]);
    const [loadingLocation, setLoadingLocation] = useState(true);

    useEffect(() => {
        async function getCurrentLocation() {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Permissão de localização não concedida');
                    setLoadingLocation(false);
                    return;
                }
                let loc = await Location.getCurrentPositionAsync({});
                setLocation(loc);
            } catch (err) {
                console.error("Erro ao pegar posição GPS no mapa:", err);
            } finally {
                setLoadingLocation(false);
            }
        }
        getCurrentLocation();
    }, []);

    useFocusEffect(
        useCallback(() => {
            let active = true;
            container.listObservations.execute()
                .then(data => {
                    if (active) setObservations(data);
                })
                .catch(err => console.error("Erro ao carregar observações para o mapa:", err));
            return () => { active = false; };
        }, [])
    );

    if (loadingLocation) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#16a34a" />
                <Text style={styles.loadingText}>Carregando localização e mapa...</Text>
            </View>
        );
    }

    const initialRegion = location ? {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    } : {
        latitude: -20.3155,
        longitude: -40.3128,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                showsUserLocation={true}
                showsMyLocationButton={true}
                initialRegion={initialRegion}
            >
                {observations.map((obs) => (
                    <Marker
                        key={obs.id}
                        coordinate={{
                            latitude: obs.coordinates.latitude,
                            longitude: obs.coordinates.longitude,
                        }}
                        title="Observação de Campo"
                        pinColor="#16a34a"
                    >
                        <Callout style={styles.callout}>
                            <View style={styles.calloutContainer}>
                                {obs.photo ? (
                                    <Image source={{ uri: obs.photo }} style={styles.calloutImage} resizeMode="cover" />
                                ) : null}
                                <Text style={styles.calloutTitle}>Observação</Text>
                                <Text style={styles.calloutCoords}>
                                    {obs.coordinates.latitude.toFixed(4)}, {obs.coordinates.longitude.toFixed(4)}
                                </Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 14,
        color: '#6b7280',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    callout: {
        width: 140,
    },
    calloutContainer: {
        alignItems: 'center',
        padding: 4,
    },
    calloutImage: {
        width: 120,
        height: 80,
        borderRadius: 8,
        marginBottom: 6,
    },
    calloutTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#1f2937',
    },
    calloutCoords: {
        fontSize: 10,
        color: '#6b7280',
    },
});
