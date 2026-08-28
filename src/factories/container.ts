import { AsyncStorageObservationRepository } from "../infra/AsyncStorageObservationRepository";
import { InMemoryObservationRepository } from "../infra/InMemoryObservationRepository";

import { DeleteObservation } from "../usecases/DeleteObservation";
import { ListObservations } from "../usecases/ListObservations";
import { RegisterObservation } from "../usecases/RegisterObservation";

/**
 * FACTORY / CONTAINER (Injeção de Dependência via Singleton)
 * 
 * 📌 RELAÇÃO NO DIAGRAMA DE CLASSE (UML):
 * - Inversão de Dependência: O Container instancia o repositório concreto (AsyncStorageObservationRepository ou InMemoryObservationRepository)
 *   e o injeta nos Casos de Uso. Os Casos de Uso dependem APENAS da interface ObservationRepository.
 * 
 * Exemplo de uso nas telas:
 * container.registerObservation.execute({ ... })
 * container.listObservations.execute()
 */
class Container {
    private static instance: Container;
    public readonly observationRepository: AsyncStorageObservationRepository | InMemoryObservationRepository;
    public readonly registerObservation: RegisterObservation;
    public readonly listObservations: ListObservations;
    public readonly deleteObservation: DeleteObservation;

    private constructor() {
        this.observationRepository = AsyncStorageObservationRepository.getInstance();
        this.registerObservation = new RegisterObservation(this.observationRepository);
        this.listObservations = new ListObservations(this.observationRepository);
        this.deleteObservation = new DeleteObservation(this.observationRepository);
    }

    public static getInstance(): Container {
        if (!this.instance) {
            this.instance = new Container();
        }
        return this.instance;
    }
}
export const container = Container.getInstance();