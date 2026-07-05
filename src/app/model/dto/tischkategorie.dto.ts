import { TischDto } from './tisch.dto';

export interface TischkategorieDto {
    id: number;
    name: string;
    sortierIndex: number;
    aktiv: boolean;
    tische?: TischDto[];
}
