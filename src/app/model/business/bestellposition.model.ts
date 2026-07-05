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
    calc_correction: number = 0;
    eigenschaften: EigenschaftDto[];
    drucker_id: number;
    summe_ohne_eigenschaften: number;

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
}
