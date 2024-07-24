import { Drucker } from "./drucker.class";
import { Produktbereich } from "./produktbereich.class";
import { Produkteinteilung } from "./produkteinteilung.class";

export class Produktkategorie {
    id: number;
    name: string;
    produkteinteilungen: Array<Produkteinteilung>;
    color: string;
    drucker_id_level_1: number | null;
    sortierindex: number;
    drucker?: Drucker
    produktbereich?: Produktbereich;
}
