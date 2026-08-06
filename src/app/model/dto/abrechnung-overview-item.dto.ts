import { PersonDto } from './person.dto';

export interface AbrechnungOverviewItemDto {
    kellner: PersonDto;
    abrechnungen_anzahl: number;
    abrechnungen_summe: number;
    rueckrechnungen_anzahl: number;
    rueckrechnungen_summe: number;
    summe_offen: number;
}
