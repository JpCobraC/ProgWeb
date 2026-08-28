import { AsyncStorageObservationRepository } from "../infra/AsyncStorageObservationRepository";

import { DeleteObservation } from "../usecases/DeleteObservation";
import { ListObservations } from "../usecases/ListObservations";
import { RegisterObservation } from "../usecases/RegisterObservation";

/**
 * FACTORY / CONTAINER (Injeção de Dependência via Singleton)
 * 
 * Centraliza a instanciação do Repositório e dos Casos de Uso.
 * Permite usar em qualquer tela do app:
 * `container.registerObservation.execute(...)`
 * `container.listObservations.execute()`
 * `container.deleteObservation.execute(id)`
 */
class Container {
    private static instance: Container;
    public readonly observationRepository: AsyncStorageObservationRepository;
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