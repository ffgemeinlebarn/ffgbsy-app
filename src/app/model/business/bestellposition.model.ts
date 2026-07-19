import { computed, signal } from '@angular/core';
import { displayEuroNumber } from '../../misc/euro-preis.helper';
import { BestellpositionDto } from '../dto/bestellposition.dto';
import { EigenschaftDto } from '../dto/eigenschaft.dto';
import { ProduktDto } from '../dto/produkt.dto';

export class Bestellposition {
    public readonly localKey = crypto.randomUUID();

    public id: BestellpositionId = null;
    public anzahl = signal<number>(1);
    public produkt: ProduktDto;
    public notiz = signal('');
    public eigenschaften = signal<EigenschaftDto[]>([]);
    public eigenschaftenMitOhne = computed<{ mit: EigenschaftDto[]; ohne: EigenschaftDto[] }>(() => {
        return {
            mit: this.eigenschaften().filter((e) => !e.in_produkt_enthalten),
            ohne: this.eigenschaften().filter((e) => e.in_produkt_enthalten),
        };
    });
    public eigenschaftenAbweichend = computed<{ mit: EigenschaftDto[]; ohne: EigenschaftDto[] }>(() => {
        return {
            mit: this.eigenschaftenMitOhne().mit.filter((e) => e.aktiv),
            ohne: this.eigenschaftenMitOhne().ohne.filter((e) => !e.aktiv),
        };
    });
    public drucker_id: DruckerId;

    public bestellungen_id: BestellungId;
    public drucker_id_level_0: DruckerId | null;
    public drucker_id_level_1: DruckerId | null;
    public drucker_id_level_2: DruckerId | null;

    public summe = computed(() => this.summe_ohne_eigenschaften() + this.summe_eigenschaften());
    public summe_ohne_eigenschaften = computed(() => this.anzahl() * this.produkt.preis);
    public summe_eigenschaften = computed<number>(() => {
        const mit = this.eigenschaftenAbweichend()
            .mit.map((e) => e.preis)
            .reduce((a, c) => a + c, 0);
        const ohne = this.eigenschaftenAbweichend()
            .ohne.map((e) => e.preis)
            .reduce((a, c) => a + c, 0);

        return mit - ohne;
    });

    // Display Props
    public hasEigenschaftenAbweichendMit = computed(() => this.eigenschaftenAbweichend().mit.length > 0);
    public hasEigenschaftenAbweichendOhne = computed(() => this.eigenschaftenAbweichend().ohne.length > 0);

    public eigenschaftenAbweichendMitDisplay = computed(() =>
        this.eigenschaftenAbweichend()
            .mit.map((e) => {
                return e.preis > 0 ? `${e.name} (${this.anzahl()}x = +${displayEuroNumber(this.anzahl() * e.preis)})` : e.name;
            })
            .join(', '),
    );

    public eigenschaftenAbweichendOhneDisplay = computed(() =>
        this.eigenschaftenAbweichend()
            .ohne.map((e) => {
                return e.preis > 0 ? `${e.name} (${this.anzahl()}x = +${displayEuroNumber(this.anzahl() * e.preis)})` : e.name;
            })
            .join(', '),
    );

    public isUnmodified = computed(() => !this.hasEigenschaftenAbweichendMit() && !this.hasEigenschaftenAbweichendOhne());

    public static fromProduct(produkt: ProduktDto) {
        const bestellposition = new Bestellposition();
        bestellposition.produkt = produkt;
        bestellposition.eigenschaften.set(structuredClone(produkt.eigenschaften));
        return bestellposition;
    }

    public static fromBestellpostionDto(dto: BestellpositionDto) {
        const bestellposition = new Bestellposition();
        bestellposition.id = dto.id;
        bestellposition.anzahl.set(dto.anzahl);
        bestellposition.produkt = dto.produkt;
        bestellposition.notiz.set(dto.notiz);
        bestellposition.eigenschaften.set([...dto.eigenschaften.mit, ...dto.eigenschaften.ohne]);
        bestellposition.drucker_id = dto.drucker_id;
        bestellposition.bestellungen_id = dto.bestellungen_id;
        bestellposition.drucker_id_level_0 = dto.drucker_id_level_0;
        bestellposition.drucker_id_level_1 = dto.drucker_id_level_1;
        bestellposition.drucker_id_level_2 = dto.drucker_id_level_2;

        return bestellposition;
    }

    public toDto(): BestellpositionDto {
        return {
            id: this.id,
            anzahl: this.anzahl(),
            bestellungen_id: this.bestellungen_id,
            produkte_id: this.produkt.id,
            produkt: this.produkt,
            drucker_id_level_0: this.drucker_id_level_0,
            drucker_id_level_1: this.drucker_id_level_1,
            drucker_id_level_2: this.drucker_id_level_2,
            notiz: this.notiz(),
            summe: this.summe(),
            summe_eigenschaften: this.summe_eigenschaften(),
            summe_ohne_eigenschaften: this.summe_ohne_eigenschaften(),
            drucker_id: this.drucker_id,
            eigenschaften: this.eigenschaftenAbweichend(),
        };
    }
}
