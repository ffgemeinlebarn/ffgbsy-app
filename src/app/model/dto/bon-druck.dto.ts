import { DruckerDto } from './drucker.dto';

export interface BonDruckDto {
    id: BonDruckId;
    bons_id: BonId;
    datum: Date | string;
    laufnummer: boolean;
    timestamp: Date | string | null;
    success: boolean;
    message: string | null;
    drucker: DruckerDto;
}
