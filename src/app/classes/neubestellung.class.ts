import { Bestellung } from "./bestellung.class";

export class Neubestellung {
    bestellung: Bestellung | null = null;
    status: null | 'begonnen' | 'tischauswahl' | 'bestellpositionen' = null;
}
