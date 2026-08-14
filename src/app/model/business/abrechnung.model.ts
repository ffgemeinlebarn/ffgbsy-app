import { computed, signal } from '@angular/core';
import { AbrechnungDto } from '../dto/abrechnung.dto';
import { BonDto } from '../dto/bon.dto';
import { PersonDto } from '../dto/person.dto';

export class Abrechnung {
    public stelle: string;
    public kellner: PersonDto;
    public bons = signal<BonDto[]>([]);
    public lockedBonIds: number[] = [];

    public bonsAnzahl = computed(() => this.bons().length);

    public summe = computed(() =>
        this.bons()
            .map((b) => b.summe)
            .reduce((a, c) => a + c, 0),
    );

    constructor(stelle: string, kellner: PersonDto) {
        this.stelle = stelle;
        this.kellner = kellner;
    }

    asDto(): AbrechnungDto {
        return {
            id: undefined,
            stelle: this.stelle,
            bons: this.bons(),
            kellner: this.kellner,
            summe: this.summe(),
            timestamp: new Date(),
        };
    }
}
