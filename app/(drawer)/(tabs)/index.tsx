import { container } from '@/src/factories/container';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import * as Location from 'expo-location';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CameraScreen() {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView | null>(null);
    const [uri, setUri] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        async function getCurrentLocation() {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Permissão Negada', 'Permissão de localização é necessária para registrar coordenadas.');
                    return;
                }
                let loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
                setLocation(loc);
            } catch (err) {
                console.error('Erro ao obter localização:', err);
            }
        }
        getCurrentLocation();
    }, []);

    if (!permission) {
        return <View style={styles.container} />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.permissionContainer}>
                <Text style={styles.message}>Precisamos da sua permissão para utilizar a câmera</Text>
                <Button onPress={requestPermission} title="Conceder Permissão" color="#16a34a" />
            </View>
        );
    }

    async function saveFoto() {
        if (!uri) {
            Alert.alert('Erro', 'Nenhuma foto capturada.');
            return;
        }

        if (!location) {
            Alert.alert('Erro', 'Aguardando captura da localização GPS. Tente novamente em instantes.');
            return;
        }

        try {
            setSaving(true);
            await container.registerObservation.execute({
                photo: uri,
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });
            Alert.alert('Sucesso', 'Observação salva com sucesso!');
            setUri(null);
        } catch (error: any) {
            Alert.alert('Erro ao Salvar', error.message || 'Ocorreu um erro ao salvar a observação.');
        } finally {
            setSaving(false);
        }
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    async function takePicture() {
        if (cameraRef.current) {
            try {
                const foto = await cameraRef.current.takePictureAsync();
                if (foto?.uri) {
                    setUri(foto.uri);
                }
            } catch (err) {
                Alert.alert('Erro', 'Não foi possível tirar a foto.');
            }
        }
    }

    function renderPhotoPreview(photoUri: string) {
        return (
            <View style={styles.previewContainer}>
                <Image source={{ uri: photoUri }} style={styles.previewImage} resizeMode="cover" />
                <View style={styles.previewControls}>
                    <TouchableOpacity style={[styles.controlButton, styles.cancelButton]} onPress={() => setUri(null)} disabled={saving}>
                        <MaterialIcons name="close" size={28} color="#ffffff" />
                        <Text style={styles.buttonText}>Refazer</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={[styles.controlButton, styles.saveButton]} onPress={saveFoto} disabled={saving}>
                        <MaterialIcons name="check" size={28} color="#ffffff" />
                        <Text style={styles.buttonText}>{saving ? 'Salvando...' : 'Salvar'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    function renderCameraView() {
        return (
            <View style={styles.container}>
                <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
                    <View style={styles.topActions}>
                        <TouchableOpacity style={styles.iconButton} onPress={toggleCameraFacing}>
                            <MaterialCommunityIcons name="camera-flip" size={28} color="#ffffff" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.bottomActions}>
                        <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
                            <View style={styles.captureInnerCircle} />
                        </TouchableOpacity>
                    </View>
                </CameraView>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {uri ? renderPhotoPreview(uri) : renderCameraView()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    permissionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: '#ffffff',
    },
    message: {
        textAlign: 'center',
        fontSize: 16,
        color: '#374151',
        marginBottom: 16,
    },
    camera: {
        flex: 1,
        justifyContent: 'space-between',
    },
    topActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingTop: 48,
        paddingHorizontal: 24,
    },
    bottomActions: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 40,
    },
    iconButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    captureButton: {
        width: 76,
        height: 76,
        borderRadius: 38,
        borderWidth: 4,
        borderColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    captureInnerCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#ffffff',
    },
    previewContainer: {
        flex: 1,
        backgroundColor: '#000000',
    },
    previewImage: {
        flex: 1,
        width: '100%',
    },
    previewControls: {
        position: 'absolute',
        bottom: 40,
        left: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    controlButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 30,
        gap: 8,
    },
    cancelButton: {
        backgroundColor: '#ef4444',
    },
    saveButton: {
        backgroundColor: '#16a34a',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
