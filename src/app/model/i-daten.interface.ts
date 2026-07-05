import { AufnehmerDto } from './dto/aufnehmer.dto';
import { IProdukt } from './i-produkt.interface';
import { IProduktbereich } from './i-produktbereich.interface';
import { IProdukteinteilung } from './i-produkteinteilung.interface';
import { IProduktkategorie } from './i-produktkategorie.interface';
import { ITisch } from './i-tisch.interface';
import { ITischkategorie } from './i-tischkategorie.interface';

export interface IDaten {
    aufnehmer: AufnehmerDto[];
    produktbereiche: Array<IProduktbereich>;
    produktkategorien: Array<IProduktkategorie>;
    produkteinteilungen: Array<IProdukteinteilung>;
    produkte: Array<IProdukt>;
    tischkategorien: Array<ITischkategorie>;
    tische: Array<ITisch>;

    version: number;
}
