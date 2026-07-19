export interface EigenschaftDto {
    id: EigenschaftId;
    aktiv: boolean;
    eigenschaften_id: number; // TODO: was/warum?
    in_produkt_enthalten: boolean;
    name: string;
    preis: number;
    produktkategorien_id: ProduktkategorieId;
}
