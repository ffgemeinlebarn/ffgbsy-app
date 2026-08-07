import { PersonDto } from './person.dto';

export interface RueckrechnungDto {
    id: RueckrechnungId;
    stelle: string;
    kellner: PersonDto;
    timestamp: Date;
    summe: number;
}
