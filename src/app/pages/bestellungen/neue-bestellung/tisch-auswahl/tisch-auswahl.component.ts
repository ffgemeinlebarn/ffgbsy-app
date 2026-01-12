import { NgClass } from '@angular/common';
import { Component, computed, effect, inject, output, signal } from '@angular/core';
import { IonButton, IonContent, IonFooter } from '@ionic/angular/standalone';
import { DataService } from 'src/app/data/data.service';
import { Tisch } from 'src/app/model/tisch.class';
import { Tischkategorie } from 'src/app/model/tischkategorie.class';

@Component({
    selector: 'app-tisch-auswahl',
    templateUrl: './tisch-auswahl.component.html',
    styleUrls: ['./tisch-auswahl.component.scss'],
    imports: [IonContent, IonFooter, IonButton, NgClass],
})
export class TischAuswahlComponent {
    private data = inject(DataService);
    public onTischSelected = output<Tisch>();

    public tischkategorien = this.data.tischkategorien;
    public filtredTischkategorienToDisplay = computed(() => this.tischkategorien()?.filter((tischkategorie) => tischkategorie.aktiv) ?? []);
    public selectedTischkategorie = signal<Tischkategorie>(null);
    public filtredTischeToDisplay = signal<Tisch[]>([]);

    constructor() {
        effect(() => {
            if (this.selectedTischkategorie() == null) {
                this.selectTischkategorie(this.tischkategorien()[0]);
            }

            this.filtredTischeToDisplay.set(this.data.tische().filter((tisch) => tisch.tischkategorien_id == this.selectedTischkategorie()?.id && tisch.aktiv) ?? []);
        });
    }

    public selectTischkategorie(tischkategorie: Tischkategorie) {
        this.selectedTischkategorie.set(tischkategorie);
    }

    public selectTisch(tisch: Tisch) {
        this.onTischSelected.emit(tisch);
    }
}
