import { BonDto } from './bon.dto';
import { PersonDto } from './person.dto';

export interface AbrechnungDto {
    id: AbrechnungId;
    stelle: string;
    kellner: PersonDto;
    bons: BonDto[];
    summe: number;
    timestamp: Date;
}
