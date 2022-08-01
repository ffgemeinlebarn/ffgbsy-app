import { Bestellung } from "./bestellung.class";
import { Drucker } from "./drucker.class";
import { StornobonDruck } from "./stornobonDruck";

export class Stornobon {
    id: number;
    bestellungen_id: number;
    drucker_id: number;

    drucker: Drucker | null;
    bestellung: Bestellung | null;

    drucke: Array<StornobonDruck> = [];
}
