import { Bestellung } from "./bestellung.model";
import { BonDruck } from "./bonDruck";
import { Drucker } from "./drucker.class";

export interface Bon {
    id: number;
    bestellungen_id: number;
    drucker_id: number;
    drucker: Drucker | null;
    bestellung: Bestellung | null;
    drucke: BonDruck[];
    tries: number;
    successes: number;
    fails: number;

    // only clientside for selecting on printing
    selected?: boolean;
}
