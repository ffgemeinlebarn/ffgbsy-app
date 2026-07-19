export interface TischDto {
    id: TischId;
    reihe: string;
    nummer: number;
    tischkategorien_id: TischkategorieId;
    aktiv: boolean;
    sortierIndex: number;
}
