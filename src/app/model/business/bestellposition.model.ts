import { BestellpositionDto } from '../dto/bestellposition.dto';
import { EigenschaftDto } from '../dto/eigenschaft.dto';
import { ProduktDto } from '../dto/produkt.dto';

export class Bestellposition {
    id: BestellpositionId = null;
    anzahl: number = 0;
    produkt: ProduktDto;
    notiz: string = '';
    display: any = {
        eigenschaften: {
            mit: [],
            ohne: [],
        },
    };
    eigenschaften: EigenschaftDto[];
    drucker_id: number;

    bestellungen_id: BestellungId;
    drucker_id_level_0: DruckerId | null;
    drucker_id_level_1: DruckerId | null;
    drucker_id_level_2: DruckerId | null;

    summe: number = 0;
    summe_ohne_eigenschaften: number;
    summe_eigenschaften: number;
    calc_correction: number = 0;

    constructor(produkt: ProduktDto) {
        this.produkt = produkt;
        this.anzahl = 1;
        this.notiz = '';
        this.display = {
            eigenschaften: {
                mit: [],
                ohne: [],
            },
        };

        this.eigenschaften = structuredClone(this.produkt.eigenschaften);
    }

    public toDto(): BestellpositionDto {
        return {
            id: this.id,
            anzahl: this.anzahl,
            bestellungen_id: this.bestellungen_id,
            produkte_id: this.produkt.id,
            produkt: this.produkt,
            drucker_id_level_0: this.drucker_id_level_0,
            drucker_id_level_1: this.drucker_id_level_1,
            drucker_id_level_2: this.drucker_id_level_2,
            notiz: this.notiz,
            summe: this.summe,
            summe_eigenschaften: this.summe_eigenschaften,
            summe_ohne_eigenschaften: this.summe_ohne_eigenschaften,
            calc_correction: this.calc_correction,
            drucker_id: this.drucker_id,
            eigenschaften: {
                mit: this.eigenschaften.filter((e) => e.aktiv && !e.in_produkt_enthalten),
                ohne: this.eigenschaften.filter((e) => e.aktiv && e.in_produkt_enthalten),
            },
        };
    }
}
