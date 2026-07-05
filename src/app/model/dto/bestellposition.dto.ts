import { EigenschaftDto } from './eigenschaft.dto';
import { ProduktDto } from './produkt.dto';

export interface BestellpositionDto {
    id: BestellpositionId;
    anzahl: number;
    produkte_id: ProduktId;
    notiz: string;
    drucker_id: number;
    eigenschaften: {
        mit: EigenschaftDto[];
        ohne: EigenschaftDto[];
    };

    bestellungen_id: BestellungId;
    drucker_id_level_0: DruckerId | null;
    drucker_id_level_1: DruckerId | null;
    drucker_id_level_2: DruckerId | null;

    summe: number;
    summe_ohne_eigenschaften: number;
    summe_eigenschaften: number;
    calc_correction: number;

    // Objects
    produkt: ProduktDto;

    // TODO: not from api
    // display: string;
}
