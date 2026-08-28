import { Observation } from "../domain/entities/Observation";
import { ObservationRepository } from "../domain/repositories/ObservationRepository";

/**
 * CASO DE USO: ListObservations
 * 
 * Busca todas as observações salvas no repositório
 * e ordena por data de criação (mais recentes primeiro).
 */
export class ListObservations {
    constructor(
        private readonly repository: ObservationRepository
    ) { }

    public async execute(): Promise<Observation[]> {
        const list = await this.repository.findAll();
        return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
}