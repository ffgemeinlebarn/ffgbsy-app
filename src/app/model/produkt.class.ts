import { Eigenschaft } from './eigenschaft.interface';
import { IDrucker } from './i-drucker.class';
import { IGrundprodukt } from './i-grundprodukt.class';
import { Produkteinteilung } from './produkteinteilung.class';

export class Produkt {
    id: number;
    name: string;
    formal_name: string;
    preis: number;
    drucker_id_level_2: number | null;
    drucker?: IDrucker;
    aktiv: boolean;
    sortierindex: number;
    produkteinteilungen_id: number;
    grundprodukte_id: number | null;
    grundprodukte_multiplikator: number | null;
    celebration_active: boolean;
    celebration_last: number;
    produkteinteilung: Produkteinteilung;
    grundprodukt: IGrundprodukt | null;
    eigenschaften: Array<Eigenschaft>;
    hauptspeise: boolean;
}
