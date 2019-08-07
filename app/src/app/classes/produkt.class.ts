import { Eigenschaft } from "./eigenschaft.class";

export class Produkt {
    id: number;
    name: string;
    formal_name: string;
    einzahl: any;
    einheit: string;
    preis: any;
    produktkategorien_id: number;
    drucker_id_level_2: any;
    sortierindex: any;
    eigenschaften: Array<Eigenschaft>;
    hash: string;

    constructor(id, name, formal_name, einzahl, einheit, preis, produktkategorien_id, drucker_id_level_2, sortierindex, eigenschaften) {
        this.id = id;
        this.name = name;
        this.formal_name = formal_name;
        this.einzahl = einzahl;
        this.einheit = einheit;
        this.preis = preis;
        this.produktkategorien_id = produktkategorien_id;
        this.drucker_id_level_2 = drucker_id_level_2;
        this.sortierindex = sortierindex;
        this.hash = Math.random().toString(36).substr(2, 9);
        this.eigenschaften = eigenschaften;
    }
}