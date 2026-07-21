import { computed, signal } from '@angular/core';
import { BonDto } from '../dto/bon.dto';

export class Abrechnung {
    public person: unknown;
    public bons = signal<BonDto[]>([]);

    public bonsAnzahl = computed(() => this.bons().length);

    public summe = computed(() =>
        this.bons()
            .map((b) => b.summe)
            .reduce((a, c) => a + c, 0),
    );

    constructor(name: string) {
        this.person = name;
    }
}
