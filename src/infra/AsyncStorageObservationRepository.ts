import AsyncStorage from '@react-native-async-storage/async-storage';
import { Observation } from "../domain/entities/Observation";
import { ObservationRepository } from "../domain/repositories/ObservationRepository";
import { Coordinates } from "../domain/value-objects/Coordinates";

const STORAGE_KEY = '@ecofield:observations';

/**
 * IMPLEMENTAÇÃO CONCRETA DO REPOSITÓRIO: AsyncStorageObservationRepository
 * 
 * Utiliza o @react-native-async-storage/async-storage para salvar dados localmente no celular.
 * Converte Objetos de Domínio para JSON string ao salvar, e de JSON para instâncias de Classe ao ler.
 */
export class AsyncStorageObservationRepository implements ObservationRepository {
    private static instance: AsyncStorageObservationRepository;

    private constructor() { }

    public static getInstance(): AsyncStorageObservationRepository {
        if (!AsyncStorageObservationRepository.instance) {
            AsyncStorageObservationRepository.instance = new AsyncStorageObservationRepository();
        }
        return AsyncStorageObservationRepository.instance;
    }

    async save(observation: Observation): Promise<void> {
        const observations = await this.findAll();
        observations.push(observation);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(observations));
    }

    async findById(id: string): Promise<Observation | undefined> {
        const observations = await this.findAll();
        return observations.find(obs => obs.id === id);
    }

    async findAll(): Promise<Observation[]> {
        try {
            const data = await AsyncStorage.getItem(STORAGE_KEY);
            if (!data) return [];
            const rawItems = JSON.parse(data);
            return rawItems.map((item: any) => new Observation(
                item.id,
                new Coordinates(item.coordinates.latitude, item.coordinates.longitude),
                item.photo,
                item.description,
                item.createdAt ? new Date(item.createdAt) : new Date()
            ));
        } catch (error) {
            console.error('Erro ao buscar observações do AsyncStorage:', error);
            return [];
        }
    }

    async delete(id: string): Promise<void> {
        const observations = await this.findAll();
        const filtered = observations.filter(obs => obs.id !== id);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    }
}
