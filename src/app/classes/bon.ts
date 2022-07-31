import { Drucker } from "./drucker.class";

export class Bon {
    id: number;
    storno_id: number;
    datum: Date | string;
    laufnummer: boolean;
    timestamp_gedruckt: Date | string | null;
    result: boolean;
    result_message: string | null;
    drucker: Drucker;
}
