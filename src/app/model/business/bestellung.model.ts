import { parseZone } from 'moment';
import { AufnehmerDto } from '../dto/aufnehmer.dto';
import { BestellungDto } from '../dto/bestellung.dto';
import { BonDto } from '../dto/bon.dto';
import { TischDto } from '../dto/tisch.dto';
import { Bestellstatus } from '../types/bestellstatus.type';
import { Bestellposition } from './bestellposition.model';

export class Bestellung {
    public id: BestellungId | null = null;
    public tisch: TischDto | null = null;
    public aufnehmer: AufnehmerDto | null = null;
    public device_name: string | null = null;
    public device_ip: string | null = null;

    public status: Bestellstatus = null;

    public timestamp_begonnen: any = null;
    public timestamp_beendet: any = null;
    public bestellpositionen: Bestellposition[] = [];
    public stornopositionen: Bestellposition[] = [];
    public bestellbons: BonDto[] = [];
    public stornobons: BonDto[] = [];

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

    public toDto(): BestellungDto {
        return {
            id: this.id,
            tische_id: this.tisch.id,
            timestamp_begonnen: this.timestamp_begonnen,
            timestamp_beendet: this.timestamp_beendet,
            aufnehmer_id: this.aufnehmer.id,
            device_name: this.device_name,
            device_ip: this.device_ip,
            summe: this.summe,
            bestellpositionen: this.bestellpositionen.map((bp) => bp.toDto()),
            stornopositionen: this.stornopositionen.map((bp) => bp.toDto()),
            aufnehmer: this.aufnehmer,
            tisch: this.tisch,
            bestellbons: this.bestellbons,
            stornobons: this.stornobons,
        };
    }
}
