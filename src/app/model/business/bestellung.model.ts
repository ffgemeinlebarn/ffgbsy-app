import { computed, signal } from '@angular/core';
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
    public bestellpositionen = signal<Bestellposition[]>([]);
    public stornopositionen = signal<Bestellposition[]>([]);
    public bestellbons: BonDto[] = [];
    public stornobons: BonDto[] = [];

    public summe = computed(() =>
        this.bestellpositionen()
            .map((b) => b.summe())
            .reduce((a, c) => a + c, 0),
    );
    public summe_eigenschaften: number | null = null;
    public summe_ohne_eigenschaften: number | null = null;

    constructor(tisch?: TischDto, aufnehmer?: AufnehmerDto) {
        this.id = null;

        this.setTimestampBegonnen();
        if (tisch) this.tisch = tisch;
        if (aufnehmer) this.aufnehmer = aufnehmer;
    }

    public fromExisting(bestellung: Bestellung): Bestellung {
        this.id = bestellung.id;
        this.tisch = bestellung.tisch;
        this.aufnehmer = bestellung.aufnehmer;
        this.device_name = bestellung.device_name;
        this.device_ip = bestellung.device_ip;

        this.status = bestellung.status;
        this.timestamp_begonnen = bestellung.timestamp_begonnen;
        this.timestamp_beendet = bestellung.timestamp_beendet;
        this.bestellpositionen = bestellung.bestellpositionen;
        this.stornopositionen = bestellung.stornopositionen;
        this.bestellbons = bestellung.bestellbons;
        this.stornobons = bestellung.stornobons;

        this.summe = bestellung.summe;
        this.summe_ohne_eigenschaften = bestellung.summe_ohne_eigenschaften;

        return this;
    }

    addBestellposition(bestellposition: Bestellposition) {
        this.bestellpositionen.update((b) => [...b, bestellposition]);
    }

    setTimestampBegonnen() {
        this.timestamp_begonnen = parseZone().toISOString(true);
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
            summe: this.summe(),
            bestellpositionen: this.bestellpositionen().map((bp) => bp.toDto()),
            stornopositionen: this.stornopositionen().map((bp) => bp.toDto()),
            aufnehmer: this.aufnehmer,
            tisch: this.tisch,
            bestellbons: this.bestellbons,
            stornobons: this.stornobons,
        };
    }
}
