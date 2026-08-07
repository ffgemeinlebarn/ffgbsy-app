import { PersonDto } from '../dto/person.dto';

export interface IAbrechnungLastTransaction {
    kellner: PersonDto;
    summe: number;
    type: 'abrechnung' | 'rueckrechnung';
}
