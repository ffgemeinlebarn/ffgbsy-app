import { AufnehmerDto } from './dto/aufnehmer.dto';
import { TischDto } from './dto/tisch.dto';
import { TischkategorieDto } from './dto/tischkategorie.dto';
import { IProdukt } from './i-produkt.interface';
import { IProduktbereich } from './i-produktbereich.interface';
import { IProdukteinteilung } from './i-produkteinteilung.interface';
import { IProduktkategorie } from './i-produktkategorie.interface';

export interface IDaten {
    aufnehmer: AufnehmerDto[];
    produktbereiche: Array<IProduktbereich>;
    produktkategorien: Array<IProduktkategorie>;
    produkteinteilungen: Array<IProdukteinteilung>;
    produkte: Array<IProdukt>;
    tischkategorien: Array<TischkategorieDto>;
    tische: Array<TischDto>;

    version: number;
}
