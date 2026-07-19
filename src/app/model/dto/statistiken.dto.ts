export interface StatistikProduktkategorienUndBereicheDto {
    header: {
        id: ProduktkategorieId;
        name: string;
    }[];
    data: {
        datum: number;
        summe: number;
        data: {
            bestellte_produkte: number;
            summe: number;
        }[];
    }[];
}
