import { ProduktDto } from './produkt.dto';
import { ProduktkategorieDto } from './produktkategorie.dto';

export interface ProdukteinteilungDto {
    id: ProdukteinteilungId;
    name: string;
    produkte: ProduktDto[];
    sortierIndex: number;
    produktkategorien_id: ProduktkategorieId;
    produktkategorie?: ProduktkategorieDto;
}
