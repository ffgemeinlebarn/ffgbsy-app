import { ProduktDto } from './i-produkt.interface';
import { ProduktkategorieDto } from './produktkategorie.dto';

export interface ProdukteinteilungDto {
    id: number;
    name: string;
    produkte: ProduktDto[];
    sortierindex: number;
    produktkategorien_id: number;
    produktkategorie?: ProduktkategorieDto;
}
