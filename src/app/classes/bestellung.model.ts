import { parseZone } from "moment";
import { Bestellstatus } from "../types/bestellstatus.type";
import { Aufnehmer } from "./aufnehmer.model";
import { Bestellposition } from "./bestellposition.model";
import { Bon } from "./bon.model";
import { Tisch } from "./tisch.class";

export class Bestellung {
    public id: number;
    public tisch: Tisch;
    public aufnehmer: Aufnehmer;
    public device_name: string;
    public device_ip: string | null = null;

    public status: Bestellstatus;

    public timestamp_begonnen: any = null;
    public timestamp_beendet: any = null;
    public bestellpositionen: Bestellposition[] = [];
    public stornopositionen: Bestellposition[] = [];
    public bestellbons: Bon[] = [];
    public stornobons: Bon[] = [];

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
        this.timestamp_begonnen = parseZone().toISOString(true);
    }

    calcSumme() {
        let summe = 0.00;

        for (let bp of this.bestellpositionen) {
            summe += (bp.anzahl * bp.produkt.preis) + bp.calc_correction;
        }

        return summe;
    }
}
