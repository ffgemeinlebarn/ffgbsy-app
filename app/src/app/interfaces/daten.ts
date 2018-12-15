import { Produkt } from "../classes/produkt.class";

export interface Daten {
    version: number;
    produktkategorien: Array<any>;
    produkte: Array<Produkt>;
    tischkategorien: Array<any>;
    tische: Array<any>;
}