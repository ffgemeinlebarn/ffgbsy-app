import { IDrucker } from './i-drucker.class';

export interface IProduktbereich {
    id: number;
    name: string;
    farbe: string;
    drucker_id_level_0: number | null;
    drucker?: IDrucker;
}
