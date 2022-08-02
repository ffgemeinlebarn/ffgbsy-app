import { BestellbonDruck } from "./bestellbonDruck";
import { Bestellung } from "./bestellung.class";
import { Drucker } from "./drucker.class";

export class Bestellbon {
    id: number;
    bestellungen_id: number;
    drucker_id: number;

    drucker: Drucker | null;
    bestellung: Bestellung | null;

    drucke: Array<BestellbonDruck> = [];
}
