import { Produkteinteilung } from "./produkteinteilung.class";

export class Produktkategorie {
    id: number;
    name: string;
    produkteinteilungen: Array<Produkteinteilung>;
    color: string;
    drucker_id_level_1: any;
    sortierindex: number;
}
