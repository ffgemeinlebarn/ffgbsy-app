import { IAufnehmer } from './i-aufnehmer.model';
import { Produkt } from './produkt.class';
import { Produktbereich } from './produktbereich.class';
import { Produkteinteilung } from './produkteinteilung.class';
import { Produktkategorie } from './produktkategorie.class';
import { Tisch } from './tisch.class';
import { Tischkategorie } from './tischkategorie.class';

export interface IDaten {
    aufnehmer: IAufnehmer[];
    produktbereiche: Array<Produktbereich>;
    produktkategorien: Array<Produktkategorie>;
    produkteinteilungen: Array<Produkteinteilung>;
    produkte: Array<Produkt>;
    tischkategorien: Array<Tischkategorie>;
    tische: Array<Tisch>;

    version: number;
}
