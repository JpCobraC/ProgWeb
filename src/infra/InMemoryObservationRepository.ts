import { Observation } from "../domain/entities/Observation";
import { ObservationRepository } from "../domain/repositories/ObservationRepository";

/**
 * REPOSITÓRIO EM MEMÓRIA (InMemoryObservationRepository)
 * 
 * 💡 DICA PARA PROVA:
 * Se o professor pedir o repositório mais simples/rápido de implementar na prova:
 * 1. Crie um array privado: private items: Entity[] = [];
 * 2. Implemente os métodos async: save(), findAll(), findById(), delete().
 */
export class InMemoryObservationRepository implements ObservationRepository {
    private observations: Observation[] = [];
    private static instance: InMemoryObservationRepository;

    private constructor() { }

    public static getInstance(): InMemoryObservationRepository {
        if (!InMemoryObservationRepository.instance) {
            InMemoryObservationRepository.instance = new InMemoryObservationRepository();
        }
        return InMemoryObservationRepository.instance;
    }

    async save(observation: Observation): Promise<void> {
        this.observations.push(observation);
    }
    async findById(id: string): Promise<Observation | undefined> {
        return this.observations.find(obs => obs.id === id);
    }
    async findAll(): Promise<Observation[]> {
        return this.observations;
    }
    async delete(id: string): Promise<void> {
        this.observations = this.observations.filter(obs => obs.id !== id);
    }
}