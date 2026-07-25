import { BonDto } from './bon.dto';

export interface AbrechnungDto {
    id: AbrechnungId;
    person: PersonId;
    bons: BonDto[];
}
