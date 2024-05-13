import { Bestellposition } from "./bestellposition.class";
import { Aufnehmer } from "./aufnehmer.class";
import { Tisch } from "./tisch.class";
import { Bon } from "./bon";

export class Bestellung {
    public id: number;
    public tisch: Tisch;
    public aufnehmer: Aufnehmer;
    public device_name: string;
    public device_ip: string | null = null;

    public status: null | 'tischauswahl' | 'bestellpositionen';

    public timestamp_begonnen: any = null;
    public timestamp_beendet: any = null;
    public bestellpositionen: Array<Bestellposition> = Array();
    public stornopositionen: Array<Bestellposition> = Array();
    public bestellbons: Array<Bon> = Array();
    public stornobons: Array<Bon> = Array();

    public summe: number | null = null;
    public summe_ohne_eigenschaften: number | null = null;

    constructor(tisch?: Tisch, aufnehmer?: Aufnehmer) {

        this.id = null;

        this.setTimestampBegonnen();
        if (tisch) this.tisch = tisch;
        if (aufnehmer) this.aufnehmer = aufnehmer;
    }

    addBestellposition(bestellposition: Bestellposition) {
        this.bestellpositionen.push(bestellposition);
    }

    setTimestampBegonnen() {
        let now = new Date();
        now.setTime(now.getTime() - now.getTimezoneOffset() * 60 * 1000);
        this.timestamp_begonnen = now.toISOString().slice(0, 19).replace('T', ' ');
    }

    calcSumme() {
        let summe = 0.00;

        for (let bp of this.bestellpositionen) {
            summe += (bp.anzahl * bp.produkt.preis) + bp.calc_correction;
        }

        return summe;
    }
}
