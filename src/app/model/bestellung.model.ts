import { parseZone } from 'moment';
import { Bestellstatus } from '../model/bestellstatus.type';
import { Bestellposition } from './bestellposition.model';
import { AufnehmerDto } from './dto/aufnehmer.dto';
import { TischDto } from './dto/tisch.dto';
import { IBon } from './i-bon.model';

export class Bestellung {
    public id: number | null = null;
    public tisch: TischDto | null = null;
    public aufnehmer: AufnehmerDto | null = null;
    public device_name: string | null = null;
    public device_ip: string | null = null;

    public status: Bestellstatus = null;

    public timestamp_begonnen: any = null;
    public timestamp_beendet: any = null;
    public bestellpositionen: Bestellposition[] = [];
    public stornopositionen: Bestellposition[] = [];
    public bestellbons: IBon[] = [];
    public stornobons: IBon[] = [];

    public summe: number | null = null;
    public summe_ohne_eigenschaften: number | null = null;

    constructor(tisch?: TischDto, aufnehmer?: AufnehmerDto) {
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
        let summe = 0.0;

        for (let bp of this.bestellpositionen) {
            summe += bp.anzahl * bp.produkt.preis + bp.calc_correction;
        }

        return summe;
    }
}
