import { Bestellposition } from "./bestellposition.class";
import { Aufnehmer } from "./aufnehmer.class";
import { Geraet } from "./geraet.class";
import { Tisch } from "./tisch.class";

export class Bestellung {
    public id: number;
    public tisch: Tisch;
    public aufnehmer: Aufnehmer;
    public geraet: Geraet;

    public timestamp_begonnen: any = null;
    public timestamp_beendet: any = null;
    public timestamp_gedruckt: any = null;
    public bestellpositionen: Array<Bestellposition> = Array();

    constructor (tisch?: Tisch, aufnehmer?: Aufnehmer, geraet?: Geraet){

        this.id = null;

        let now = new Date();
        now.setTime(now.getTime() - now.getTimezoneOffset()*60*1000);

        this.timestamp_begonnen = now.toISOString().slice(0, 19).replace('T', ' ');
        if(tisch) this.tisch = tisch;
        if(aufnehmer) this.aufnehmer = aufnehmer;
        if(geraet) this.geraet = geraet;
    }

    addBestellposition(bestellposition: Bestellposition){
        this.bestellpositionen.push(bestellposition);
    }

    calcSumme(){
        let summe = 0.00;

        for(let bp of this.bestellpositionen){
            summe += (bp.anzahl * bp.produkt.preis);
        }

        return summe;
    }
}