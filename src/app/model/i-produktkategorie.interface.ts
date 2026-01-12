import { IDrucker } from './i-drucker.class';
import { IEigenschaft } from './i-eigenschaft.interface';
import { IProduktbereich } from './i-produktbereich.interface';
import { IProdukteinteilung } from './i-produkteinteilung.interface';

export interface IProduktkategorie {
    id: number;
    name: string;
    produkteinteilungen: IProdukteinteilung[];
    color: string;
    drucker_id_level_1: number | null;
    sortierindex: number;
    drucker?: IDrucker;
    produktbereich?: IProduktbereich;
    eigenschaften: IEigenschaft[];
}
