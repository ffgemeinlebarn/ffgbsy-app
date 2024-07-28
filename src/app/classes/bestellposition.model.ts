import { Eigenschaft } from "./i-eigenschaft.interface";
import { Produkt } from "./produkt.class";

export class Bestellposition {
    id: number = null;
    anzahl: number = 0;
    produkt: Produkt;
    notiz: string;
    display: any = {
        eigenschaften: {
            mit: [],
            ohne: []
        }
    };
    calc_correction: any = 0.00;
    eigenschaften: Eigenschaft[];
    bestellungen_id: number;
    drucker_id: number;

    constructor(produkt: Produkt) {
        this.produkt = produkt;
        this.anzahl = 1;
        this.notiz = "";
        this.display = {
            eigenschaften: {
                mit: [],
                ohne: []
            }
        };

        this.eigenschaften = JSON.parse(JSON.stringify(this.produkt.eigenschaften));
    }
}
