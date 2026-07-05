import { DruckerDto } from './drucker.dto';
import { EigenschaftDto } from './eigenschaft.dto';
import { GrundproduktDto } from './grundprodukt.dto';

export interface ProduktDto {
    id: ProduktId;
    name: string;
    formal_name: string | null;
    preis: number;
    drucker_id_level_2: DruckerId | null;
    drucker: DruckerDto | null;
    aktiv: boolean;
    sortierIndex: number;
    produkteinteilungen_id: ProdukteinteilungId;
    grundprodukte_id: GrundproduktId | null;
    grundprodukte_multiplikator: number | null;
    celebration_active: boolean;
    celebration_last: number;
    celebration_prefix: string | null;
    celebration_suffix: string | null;
    hauptspeise: number;
    grundprodukt: GrundproduktDto | null;
    eigenschaften: EigenschaftDto[];

    // produkteinteilung: ProdukteinteilungMitKategorie;
}
