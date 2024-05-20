import { Aufnehmer } from '../classes/aufnehmer.model';
import { Produkt } from "../classes/produkt.class";
import { Produktkategorie } from '../classes/produktkategorie.class';
import { Tischkategorie } from '../classes/tischkategorie.class';
import { Tisch } from '../classes/tisch.class';
import { Produktbereich } from '../classes/produktbereich.class';
import { WritableSignal } from '@angular/core';

export interface Daten {

    aufnehmer: Aufnehmer[];
    produktbereiche: Array<Produktbereich>;
    produktkategorien: Array<Produktkategorie>;
    produkte: Array<Produkt>;
    tischkategorien: Array<Tischkategorie>;
    tische: Array<Tisch>;

    version: number;
}
