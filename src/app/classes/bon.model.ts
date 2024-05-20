import { BonDruck } from "./bonDruck";
import { Bestellung } from "./bestellung.model";
import { Drucker } from "./drucker.class";

export interface Bon {
    id: number;
    bestellungen_id: number;
    drucker_id: number;

    drucker: Drucker | null;
    bestellung: Bestellung | null;

    drucke: BonDruck[];
}
