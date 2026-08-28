import { Coordinates } from "../value-objects/Coordinates";

/**
 * ENTIDADE: Observation
 * 
 * Regra de Negócio: Representa o registro de observação capturado no campo.
 * Possui um ID único, foto, coordenadas (Value Object), data de criação e descrição opcional.
 */
export class Observation {
    public readonly id: string;
    public readonly coordinates: Coordinates;
    public photo: string;
    public description?: string;
    public readonly createdAt: Date;

    constructor(
        id: string,
        coordinates: Coordinates,
        photo: string,
        description?: string,
        createdAt: Date = new Date()
    ) {
        this.id = id;
        this.coordinates = coordinates;
        this.photo = photo;
        this.description = description;
        this.createdAt = createdAt;
        this.validate(this.photo);
    }

    private validate(photo: string): void {
        if (!photo || photo.trim().length === 0) {
            throw new Error("Foto inválida");
        }
    }

    public updatePhoto(photo: string): void {
        this.photo = photo;
        this.validate(this.photo);
    }
}