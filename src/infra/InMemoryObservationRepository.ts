import { Observation } from "../domain/entities/Observation";
import { ObservationRepository } from "../domain/repositories/ObservationRepository";

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

//singleton = um unico objeto, construtur privado, só cria de dentro mesma, estatico e da classe, getinstace retorna a instancia da classe
//async = utilizar um recurso que não está na aplicação