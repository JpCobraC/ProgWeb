import { Observation } from "../domain/entities/Observation";
import { ObservationRepository } from "../domain/repositories/ObservationRepository";
import { Coordinates } from "../domain/value-objects/Coordinates";

/**
 * DTO (Data Transfer Object): Estrutura de dados recebida pela UI
 */
export interface RegisterObservationDTO {
    latitude: number;
    longitude: number;
    photo: string;
    description?: string;
}

/**
 * CASO DE USO: RegisterObservation
 * 
 * 📌 RELAÇÃO NO DIAGRAMA DE CLASSE (UML):
 * - Dependência: RegisterObservation depende de ObservationRepository (Interface), Observation (Entidade) e Coordinates (Value Object).
 * 
 * FLUXO DE EXECUÇÃO:
 * 1. Instancia e valida o Value Object (Coordinates).
 * 2. Gera o ID único e cria a Entidade (Observation).
 * 3. Envia a entidade para o repositório salvar (save).
 */
export class RegisterObservation {
    constructor(
        private readonly repository: ObservationRepository
    ) { }

    public async execute(input: RegisterObservationDTO): Promise<Observation> {
        const coordinates = new Coordinates(input.latitude, input.longitude);
        const id = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15);
        const observation = new Observation(
            id,
            coordinates,
            input.photo,
            input.description,
            new Date()
        );
        await this.repository.save(observation);
        return observation;
    }
}
