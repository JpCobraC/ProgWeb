import { AsyncStorageObservationRepository } from "../infra/AsyncStorageObservationRepository";
import { InMemoryObservationRepository } from "../infra/InMemoryObservationRepository";

import { DeleteObservation } from "../usecases/DeleteObservation";
import { ListObservations } from "../usecases/ListObservations";
import { RegisterObservation } from "../usecases/RegisterObservation";

/**
 * FACTORY / CONTAINER (Injeção de Dependência via Singleton)
 * 
 * 💡 DICA PARA PROVA:
 * Para trocar de repositório na prova (ex: de AsyncStorage para InMemory):
 * Basta trocar 'AsyncStorageObservationRepository.getInstance()' por 'InMemoryObservationRepository.getInstance()'.
 * 
 * Exemplo de acesso nas telas:
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