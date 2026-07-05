import { BestellungDto } from './bestellung.dto';
import { BonDruckDto } from './bon-druck.dto';
import { DruckerDto } from './drucker.dto';

export interface BonDto {
    id: BonId;
    bestellungen_id: BestellungId;
    drucker_id: number;
    drucker: DruckerDto | null;
    bestellung: BestellungDto | null;
    drucke: BonDruckDto[];
    tries: number;
    successes: number;
    fails: number;

    // only clientside for selecting on printing
    selected?: boolean;
}
