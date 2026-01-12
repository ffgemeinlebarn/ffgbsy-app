import { IDrucker } from './i-drucker.class';
import { IEigenschaft } from './i-eigenschaft.interface';
import { IGrundprodukt } from './i-grundprodukt.class';
import { IProdukteinteilung } from './i-produkteinteilung.interface';

export interface IProdukt {
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
    produkteinteilung: IProdukteinteilung;
    grundprodukt: IGrundprodukt | null;
    eigenschaften: IEigenschaft[];
    hauptspeise: boolean;
}
