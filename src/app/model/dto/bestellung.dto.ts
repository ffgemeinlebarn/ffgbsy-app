import { AufnehmerDto } from './aufnehmer.dto';
import { BestellpositionDto } from './bestellposition.dto';
import { BonDto } from './bon.dto';
import { TischDto } from './tisch.dto';

export interface BestellungDto {
    id: BestellungId;
    tische_id: TischId;
    aufnehmer_id: AufnehmerId;
    timestamp_begonnen: string;
    timestamp_beendet: string;
    device_name: string;
    device_ip: string;
    summe: number;
    bestellpositionen: BestellpositionDto[];
    stornopositionen: BestellpositionDto[];
    bestellbons: BonDto[];
    stornobons: BonDto[];

    // Objects
    aufnehmer: AufnehmerDto;
    tisch: TischDto;
}
