import { Drucker } from "./drucker.class";

export class StornobonDruck {
    id: number;
    stornobons_id: number;
    datum: Date | string;
    laufnummer: boolean;
    timestamp: Date | string | null;
    success: boolean;
    message: string | null;
    drucker: Drucker;
}
