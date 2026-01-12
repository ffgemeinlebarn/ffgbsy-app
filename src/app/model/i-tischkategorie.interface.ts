import { ITisch } from './i-tisch.interface';

export interface ITischkategorie {
    id: number;
    name: string;
    sortierIndex: number;
    aktiv: boolean;
    tische?: ITisch[];
}
