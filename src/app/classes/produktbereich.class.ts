import { Drucker } from "./drucker.class";

export class Produktbereich {
    id: number;
    name: string;
    farbe: string;
    drucker_id_level_0: number | null;
    drucker?: Drucker;
}
