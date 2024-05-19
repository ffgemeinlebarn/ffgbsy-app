import { Drucker } from "./drucker.class";
import { Eigenschaft } from "./eigenschaft.class";
import { Grundprodukt } from "./grundprodukt.class";
import { Produkteinteilung } from "./produkteinteilung.class";

export class Produkt {
    id: number;
    name: string;
    formal_name: string;
    preis: number;
    drucker_id_level_2: number | null;
    drucker?: Drucker;
    aktiv: boolean;
    sortierindex: number;
    produkteinteilungen_id: number;
    grundprodukte_id: number | null;
    grundprodukte_multiplikator: number | null;
    celebration_active: boolean;
    celebration_last: number;
    produkteinteilung: Produkteinteilung;
    grundprodukt: Grundprodukt | null;
    eigenschaften: Array<Eigenschaft>;
}
