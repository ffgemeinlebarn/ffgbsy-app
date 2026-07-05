import { TischDto } from './tisch.dto';

export interface TischkategorieDto {
    id: TischkategorieId;
    name: string;
    sortierIndex: number;
    aktiv: boolean;
    tische?: TischDto[];
}
