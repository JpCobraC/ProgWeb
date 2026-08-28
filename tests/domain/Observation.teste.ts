/**
 * TESTES UNITÁRIOS DE DOMÍNIO (Jest)
 * 
 * 📌 COMO RODAR OS TESTES NO TERMINAL:
 *   npm test
 *   ou:
 *   npx jest
 * 
 * 💡 ESTRUTURA BÁSICA DE UM TESTE:
 * - describe('Nome da Classe ou Módulo', () => { ... })
 * - it('descrição do que deve acontecer', () => { ... })
 * - expect(valor).toBe(resultadoEsperado)
 * - expect(() => funcaoComErro()).toThrow('Mensagem de erro')
 */

import { Observation } from "@/src/domain/entities/Observation";
import { Coordinates } from "@/src/domain/value-objects/Coordinates";

function makeCoords(latitude = -20, longitude = -40): Coordinates {
    return new Coordinates(latitude, longitude);
}

describe('Observation Entity', () => {
    describe('Constructor', () => {
        it('deve criar uma observação válida', () => {
            const coords = makeCoords();
            const observation = new Observation('id-1', coords, 'file://photo.png');
            expect(observation.id).toBe('id-1');
            expect(observation.photo).toBe('file://photo.png');
            expect(observation.coordinates).toBeInstanceOf(Coordinates);
            expect(observation.createdAt).toBeInstanceOf(Date);
        });

        it('Should throw an error if photo is invalid', () => {
            const coords = makeCoords();
            expect(() => new Observation('id-1', coords, '')).toThrow('Foto inválida');
        });
    });

    describe('updatePhoto', () => {
        it('deve atualizar a foto', () => {
            const coords = makeCoords();
            const observation = new Observation('id-1', coords, 'file://photo.png');
            observation.updatePhoto('file://photo2.png');
            expect(observation.photo).toBe('file://photo2.png');
        });

        it('deve lançar erro se a foto for inválida', () => {
            const coords = makeCoords();
            const observation = new Observation('id-1', coords, 'file://photo.png');
            expect(() => observation.updatePhoto('')).toThrow('Foto inválida');
        });
    });
});