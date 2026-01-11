import { Bestellung } from './bestellung.model';
import { Drucker } from './drucker.class';
import { IBonDruck } from './i-bon-druck';

export interface IBon {
    id: number;
    bestellungen_id: number;
    drucker_id: number;
    drucker: Drucker | null;
    bestellung: Bestellung | null;
    drucke: IBonDruck[];
    tries: number;
    successes: number;
    fails: number;

    // only clientside for selecting on printing
    selected?: boolean;
}
