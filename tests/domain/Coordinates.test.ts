import { Coordinates } from "../../src/domain/value-objects/Coordinates";

describe('Coordinates Value Objects', () => {
    it('deve criar coordenadas válidas', () => {
        const coordinates = new Coordinates(10, 20);
        expect(coordinates).toBeInstanceOf(Coordinates);
        expect(coordinates.latitude).toBe(10);
        expect(coordinates.longitude).toBe(20);
    });

    it('deve lançar exceção para latitude inválida', () => {
        expect(() => new Coordinates(100, 20)).toThrow('Latitude inválida');
    });

    it('deve lançar exceção para longitude inválida', () => {
        expect(() => new Coordinates(10, 200)).toThrow('Longitude inválida');
    });
});