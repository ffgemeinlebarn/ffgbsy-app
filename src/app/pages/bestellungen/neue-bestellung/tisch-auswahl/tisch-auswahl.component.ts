import { NgClass } from '@angular/common';
import { Component, effect, inject, output, signal } from '@angular/core';
import { IonButton, IonContent, IonFooter } from '@ionic/angular/standalone';
import { Tisch } from 'src/app/classes/tisch.class';
import { Tischkategorie } from 'src/app/classes/tischkategorie.class';
import { DataService } from 'src/app/services/data/data.service';

@Component({
    selector: 'app-tisch-auswahl',
    templateUrl: './tisch-auswahl.component.html',
    styleUrls: ['./tisch-auswahl.component.scss'],
    standalone: true,
    imports: [IonContent, IonFooter, IonButton, NgClass]
})
export class TischAuswahlComponent {
    private data = inject(DataService);
    public onTischSelected = output<Tisch>();

    public tischkategorien = this.data.tischkategorien;
    public selectedTischkategorie = signal<Tischkategorie>(null);
    public filtredTischeToDisplay = signal<Tisch[]>([]);

    constructor() {
        effect(() => {
            if (this.selectedTischkategorie() == null) {
                this.selectTischkategorie(this.tischkategorien()[0]);
            }

            this.filtredTischeToDisplay.set(this.data.tische().filter(tisch => tisch.tischkategorien_id == this.selectedTischkategorie()?.id) ?? []);
        }, { allowSignalWrites: true });
    }

    public selectTischkategorie(tischkategorie: Tischkategorie) {
        this.selectedTischkategorie.set(tischkategorie);
    }

    public selectTisch(tisch: Tisch) {
        this.onTischSelected.emit(tisch);
    }
}
