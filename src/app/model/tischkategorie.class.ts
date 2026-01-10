import { Tisch } from "./tisch.class";

export class Tischkategorie {
    id: number;
    name: string;
    sortierIndex: number;
    aktiv: boolean;
    tische?: Tisch[];
}
