import { Bestellung } from './bestellung.model';
import { IBonDruck } from './i-bon-druck';
import { IDrucker } from './i-drucker.class';

export interface IBon {
    id: number;
    bestellungen_id: number;
    drucker_id: number;
    drucker: IDrucker | null;
    bestellung: Bestellung | null;
    drucke: IBonDruck[];
    tries: number;
    successes: number;
    fails: number;

    // only clientside for selecting on printing
    selected?: boolean;
}
