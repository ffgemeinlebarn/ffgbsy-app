import { Aufnehmer } from '../classes/aufnehmer.class';
import { Produkt } from "../classes/produkt.class";
import { Produktkategorie } from '../classes/produktkategorie.class';
import { Tischkategorie } from '../classes/tischkategorie.class';
import { Tisch } from '../classes/tisch.class';
import { Produktbereich } from '../classes/produktbereich.class';

export interface Daten {

    aufnehmer: Array<Aufnehmer>;
    produktbereiche: Array<Produktbereich>;
    produktkategorien: Array<Produktkategorie>;
    produkte: Array<Produkt>;
    tischkategorien: Array<Tischkategorie>;
    tische: Array<Tisch>;

    version: number;
}
