import { Drucker } from "./drucker.class";

export class BonDruck {
    id: number;
    bons_id: number;
    datum: Date | string;
    laufnummer: boolean;
    timestamp: Date | string | null;
    success: boolean;
    message: string | null;
    drucker: Drucker;
}
