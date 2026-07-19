import { DruckerDto } from './drucker.dto';
import { EigenschaftDto } from './eigenschaft.dto';
import { ProduktbereichDto } from './produktbereich.dto';
import { ProdukteinteilungDto } from './produkteinteilung.dto';

export interface ProduktkategorieDto {
    id: ProduktkategorieId;
    name: string;
    produkteinteilungen: ProdukteinteilungDto[];
    color: string;
    drucker_id_level_1: number | null;
    sortierindex: number;
    drucker?: DruckerDto;
    produktbereich?: ProduktbereichDto;
    eigenschaften: EigenschaftDto[];
}
