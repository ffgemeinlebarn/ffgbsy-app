import { IAufnehmer } from '../classes/aufnehmer.model';
import { Produkt } from '../classes/produkt.class';
import { Produktbereich } from '../classes/produktbereich.class';
import { Produktkategorie } from '../classes/produktkategorie.class';
import { Tisch } from '../classes/tisch.class';
import { Tischkategorie } from '../classes/tischkategorie.class';

export interface IDaten {
    aufnehmer: IAufnehmer[];
    produktbereiche: Array<Produktbereich>;
    produktkategorien: Array<Produktkategorie>;
    produkte: Array<Produkt>;
    tischkategorien: Array<Tischkategorie>;
    tische: Array<Tisch>;

    version: number;
}
