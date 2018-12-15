import { Bestellposition } from "./bestellposition.class";
import { Aufnehmer } from "./aufnehmer.class";
import { Geraet } from "./geraet.class";
import { Tisch } from "./tisch.class";

export class Bestellung {
    id: number;
    tisch: Tisch;
    aufnehmer: Aufnehmer;
    geraet: Geraet;

    timestamp_begonnen: any = null;
    timestamp_beendet: any = null;
    timestamp_gedruckt: any = null;
    bestellpositionen: Array<Bestellposition> = Array();

    constructor (tisch: Tisch, aufnehmer: Aufnehmer, geraet?: Geraet){
        this.timestamp_begonnen = new Date().toISOString().slice(0, 19).replace('T', ' ');
        this.tisch = tisch;
        this.aufnehmer = aufnehmer;
        this.geraet = geraet;
    }

    calcSumme(){
        let summe = 0.00;

        for(let bp of this.bestellpositionen){
            summe += (bp.anzahl * bp.produkt.preis);
        }

        return summe;
    }
}