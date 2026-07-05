import { DruckerDto } from './drucker.dto';

export interface ProduktbereichDto {
    id: ProduktbereichId;
    name: string;
    farbe: string;
    drucker_id_level_0: DruckerId | null;
    drucker?: DruckerDto;
}
