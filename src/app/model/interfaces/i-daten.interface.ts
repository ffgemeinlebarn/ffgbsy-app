import { PersonDto } from '../dto/person.dto';
import { ProduktDto } from '../dto/produkt.dto';
import { ProduktbereichDto } from '../dto/produktbereich.dto';
import { ProdukteinteilungDto } from '../dto/produkteinteilung.dto';
import { ProduktkategorieDto } from '../dto/produktkategorie.dto';
import { TischDto } from '../dto/tisch.dto';
import { TischkategorieDto } from '../dto/tischkategorie.dto';

export interface IDaten {
    personen: PersonDto[];
    produktbereiche: Array<ProduktbereichDto>;
    produktkategorien: Array<ProduktkategorieDto>;
    produkteinteilungen: Array<ProdukteinteilungDto>;
    produkte: Array<ProduktDto>;
    tischkategorien: Array<TischkategorieDto>;
    tische: Array<TischDto>;

    version: number;
}
