import { Bestellposition } from "./bestellposition.class";
import { Aufnehmer } from "./aufnehmer.class";
import { Tisch } from "./tisch.class";

export class Bestellung {
    public id: number;
    public tisch: Tisch;
    public aufnehmer: Aufnehmer;
    public device_name: string;

    public timestamp_begonnen: any = null;
    public timestamp_beendet: any = null;
    public timestamp_gedruckt: any = null;
    public bestellpositionen: Array<Bestellposition> = Array();

    constructor(tisch?: Tisch, aufnehmer?: Aufnehmer) {

        this.id = null;
        this.device_name = "Testdevice";

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
