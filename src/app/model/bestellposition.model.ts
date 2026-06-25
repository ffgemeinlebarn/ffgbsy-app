import { IEigenschaft } from './i-eigenschaft.interface';
import { IProdukt } from './i-produkt.interface';

export class Bestellposition {
    id: number = null;
    anzahl: number = 0;
    produkt: IProdukt;
    notiz: string = '';
    display: any = {
        eigenschaften: {
            mit: [],
            ohne: [],
        },
    };
    calc_correction: any = 0.0;
    eigenschaften: IEigenschaft[];
    bestellungen_id: number;
    drucker_id: number;
    summe_ohne_eigenschaften: number;

    constructor(produkt: IProdukt) {
        this.produkt = produkt;
        this.anzahl = 1;
        this.notiz = '';
        this.display = {
            eigenschaften: {
                mit: [],
                ohne: [],
            },
        };

        this.eigenschaften = JSON.parse(JSON.stringify(this.produkt.eigenschaften));
    }
}
