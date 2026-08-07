import { AbrechnungDto } from './abrechnung.dto';
import { PersonDto } from './person.dto';
import { RueckrechnungDto } from './rueckrechnung.dto';

export interface AbrechnungKellnerStatusDto {
    kellner: PersonDto;
    abrechnungen_summe: number;
    rueckrechnungen_summe: number;
    abrechnungen: AbrechnungDto[];
    rueckrechnungen: RueckrechnungDto[];
    summe_offen: number;
}
