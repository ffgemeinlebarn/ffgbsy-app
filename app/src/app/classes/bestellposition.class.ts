import { Produkt } from "./produkt.class";

export class Bestellposition {
    id: number = null;
    anzahl: number = 0;
    storno_anzahl: number = 0;
    produkt: Produkt;
    notiz: string;
    display: any = {
        eigenschaften:{
            mit: [],
            ohne: []
        }
    };
    eigenschaften: Array<any>;
    bestellungen_id: number;

    constructor(produkt: Produkt) {
        this.produkt = produkt; //new Produkt(produkt.id, produkt.name, produkt.einzahl, produkt.einheit, produkt.preis, produkt.produktkategorien_id, produkt.drucker_id_level_2, produkt.sortierindex, produkt.eigenschaften);
        this.anzahl = 1;
        this.notiz = "";
        this.display = {
            eigenschaften:{
                mit: [],
                ohne: []
            }
        };

        this.eigenschaften = [];
        for (let e of this.produkt.eigenschaften){
            let bool = !!+e.aktiv;
            let new_e = {
                name: e.name, 
                aktiv: bool, 
                in_produkt_enthalten: 
                e.in_produkt_enthalten, 
                preis: e.preis, 
                eigenschaften_id: e.eigenschaften_id
            };
            this.eigenschaften.push(new_e);
        }
    }
}