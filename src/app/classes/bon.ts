import { BonDruck } from "./bonDruck";
import { Bestellung } from "./bestellung.class";
import { Drucker } from "./drucker.class";

export class Bon {
    id: number;
    bestellungen_id: number;
    drucker_id: number;

    drucker: Drucker | null;
    bestellung: Bestellung | null;

    drucke: Array<BonDruck> = [];
}
