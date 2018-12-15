import { Produkt } from "./produkt.class";

export class Bestellposition {
    id: number = null;
    anzahl: number = 0;
    produkt: Produkt;
    notiz: string;
    display: any = {
        eigenschaften:{
            mit: [],
            ohne: []
        }
    };

    constructor(produkt: Produkt) {
        this.id = 1;
        this.produkt = produkt;
        this.anzahl = 1;
        this.notiz = "";
    }
}