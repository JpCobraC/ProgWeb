import { ObservationRepository } from "../domain/repositories/ObservationRepository";

/**
 * CASO DE USO: DeleteObservation
 * 
 * Remove um registro de observação do repositório através do seu ID.
 */
export class DeleteObservation {
    constructor(
        private readonly repository: ObservationRepository
    ) { }

    public async execute(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}
