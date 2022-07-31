import { Produkt } from "./produkt.class";

export class Produkteinteilung {
    id: number;
    name: string;
    produkte: Array<Produkt>;
    sortierindex: number;
}
