import { Drucker } from "../classes/drucker.class";

export interface System {
    data_timestamp: number;
    data_version: number;
    drucker: Array<Drucker>;
}