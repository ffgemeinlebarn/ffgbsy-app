import { BestellungDto } from './bestellung.dto';
import { BonDruckDto } from './bon-druck.dto';
import { DruckerDto } from './drucker.dto';

export interface BonDto {
    id: BonId;
    bestellungen_id: BestellungId;
    type: 'bestellung' | 'storno';
    drucker_id: DruckerId;
    drucker: DruckerDto | null;
    bestellung: BestellungDto | null;
    drucke: BonDruckDto[];
    tries: number;
    successes: number;
    fails: number;

    //todo: need Summe!!
    summe: number;

    // only clientside for selecting on printing
    selected?: boolean;
}
