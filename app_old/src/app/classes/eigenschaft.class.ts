export class Eigenschaft {
    id: number = null;
    aktiv: boolean;
    eigenschaften_id: number;
    in_produkt_enthalten: boolean;
    name: string
    preis: number;
    produktkategorien_id: number;

    constructor(id, aktiv, eigenschaften_id, in_produkt_enthalten, name, preis, produktkategorien_id) {
        this.id = id;
        this.aktiv = aktiv;
        this.eigenschaften_id = eigenschaften_id;
        this.in_produkt_enthalten = in_produkt_enthalten;
        this.name = name;
        this.preis = preis;
        this.produktkategorien_id = produktkategorien_id;
    }
}