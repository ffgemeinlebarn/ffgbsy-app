import { computed, signal } from '@angular/core';
import { BonDto } from '../dto/bon.dto';
import { PersonDto } from '../dto/person.dto';

export class Abrechnung {
    public person: PersonDto;
    public bons = signal<BonDto[]>([]);

    public bonsAnzahl = computed(() => this.bons().length);

    public summe = computed(() =>
        this.bons()
            .map((b) => b.summe)
            .reduce((a, c) => a + c, 0),
    );

    constructor(person: PersonDto) {
        this.person = person;
    }
}
