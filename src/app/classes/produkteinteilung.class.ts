import { Produkt } from "./produkt.class";
import { Produktkategorie } from "./produktkategorie.class";

export class Produkteinteilung {
    id: number;
    name: string;
    produkte: Array<Produkt>;
    sortierindex: number;
    produktkategorie?: Produktkategorie;
}
