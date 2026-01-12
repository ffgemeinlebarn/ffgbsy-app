import { IProdukt } from './i-produkt.interface';
import { IProduktkategorie } from './i-produktkategorie.interface';

export interface IProdukteinteilung {
    id: number;
    name: string;
    produkte: IProdukt[];
    sortierindex: number;
    produktkategorien_id: number;
    produktkategorie?: IProduktkategorie;
}
