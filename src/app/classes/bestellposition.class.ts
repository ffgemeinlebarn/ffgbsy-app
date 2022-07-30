import { Produkt } from "./produkt.class";

export class Bestellposition {
    id: number = null;
    anzahl: number = 0;
    storno_anzahl: number = 0;
    produkt: Produkt;
    notiz: string;
    display: any = {
        eigenschaften: {
            mit: [],
            ohne: []
        }
    };
    calc_correction: any = 0.00;
    eigenschaften: Array<any>;
    bestellungen_id: number;

    constructor(produkt: Produkt) {
        this.produkt = produkt; //new Produkt(produkt.id, produkt.name, produkt.einzahl, produkt.einheit, produkt.preis, produkt.produktkategorien_id, produkt.drucker_id_level_2, produkt.sortierindex, produkt.eigenschaften);
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
