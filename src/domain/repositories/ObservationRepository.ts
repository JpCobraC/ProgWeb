import { Observation } from "../entities/Observation";

/**
 * INTERFACE / CONTRATO: ObservationRepository
 * 
 * Define quais métodos qualquer repositório de observações (em memória, AsyncStorage, API ou SQLite)
 * DEVE obrigatoriamente implementar na camada de infraestrutura.
 */
export interface ObservationRepository {
    save(observation: Observation): Promise<void>;
    findById(id: string): Promise<Observation | undefined>;
    findAll(): Promise<Observation[]>;
    delete(id: string): Promise<void>;
}