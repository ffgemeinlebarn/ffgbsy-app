import { AufnehmerDto } from '../dto/aufnehmer.dto';
import { ProduktDto } from '../dto/produkt.dto';
import { ProduktbereichDto } from '../dto/produktbereich.dto';
import { ProdukteinteilungDto } from '../dto/produkteinteilung.dto';
import { TischDto } from '../dto/tisch.dto';
import { TischkategorieDto } from '../dto/tischkategorie.dto';

export interface IDaten {
    aufnehmer: AufnehmerDto[];
    produktbereiche: Array<ProduktbereichDto>;
    produktkategorien: Array<ProduktDto>;
    produkteinteilungen: Array<ProdukteinteilungDto>;
    produkte: Array<ProduktDto>;
    tischkategorien: Array<TischkategorieDto>;
    tische: Array<TischDto>;

    version: number;
}
