import { NgClass } from '@angular/common';
import { Component, computed, effect, inject, output, signal } from '@angular/core';
import { IonButton, IonContent, IonFooter } from '@ionic/angular/standalone';
import { DataService } from 'src/app/data/data.service';
import { ITisch } from 'src/app/model/i-tisch.interface';
import { ITischkategorie } from 'src/app/model/i-tischkategorie.interface';

@Component({
    selector: 'app-tisch-auswahl',
    templateUrl: './tisch-auswahl.component.html',
    styleUrls: ['./tisch-auswahl.component.scss'],
    imports: [IonContent, IonFooter, IonButton, NgClass],
})
export class TischAuswahlComponent {
    private data = inject(DataService);
    public onTischSelected = output<ITisch>();

    public tischkategorien = this.data.tischkategorien;
    public filtredTischkategorienToDisplay = computed(() => this.tischkategorien()?.filter((tischkategorie) => tischkategorie.aktiv) ?? []);
    public selectedTischkategorie = signal<ITischkategorie>(null);
    public filtredTischeToDisplay = signal<ITisch[]>([]);

    constructor() {
        effect(() => {
            if (this.selectedTischkategorie() == null) {
                this.selectTischkategorie(this.tischkategorien()[0]);
            }

            this.filtredTischeToDisplay.set(this.data.tische().filter((tisch) => tisch.tischkategorien_id == this.selectedTischkategorie()?.id && tisch.aktiv) ?? []);
        });
    }

    public selectTischkategorie(tischkategorie: ITischkategorie) {
        this.selectedTischkategorie.set(tischkategorie);
    }

    public selectTisch(tisch: ITisch) {
        this.onTischSelected.emit(tisch);
    }
}
