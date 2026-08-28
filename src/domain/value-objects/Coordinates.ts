/**
 * VALUE OBJECT: Coordinates
 * 
 * Regra de Negócio: Encapsula a validação das coordenadas geográficas.
 * - Latitude deve estar entre -90 e 90.
 * - Longitude deve estar entre -180 e 180.
 * Value Objects são imutáveis (public readonly) e não possuem ID.
 * 
 * 💡 DICA PARA PROVA (Outros exemplos de Value Objects):
 * - Preco: if (value <= 0) throw new Error("Preço deve ser maior que zero");
 * - Email: if (!value.includes("@")) throw new Error("E-mail inválido");
 * - Cpf: if (value.length !== 11) throw new Error("CPF deve conter 11 dígitos");
 */
export class Coordinates {
    constructor(
        public readonly latitude: number,
        public readonly longitude: number,
    ) {
        this.validate();
    }

    private validate(): void {
        if (this.latitude < -90 || this.latitude > 90) {
            throw new Error("Latitude inválida");
        }
        if (this.longitude < -180 || this.longitude > 180) {
            throw new Error("Longitude inválida");
        }
    }
}