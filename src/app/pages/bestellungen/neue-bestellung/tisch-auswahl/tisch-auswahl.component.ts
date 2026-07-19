import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, output, signal } from '@angular/core';
import { IonButton, IonContent, IonFooter } from '@ionic/angular/standalone';
import { DataService } from '../../../../data/data.service';
import { TischDto } from '../../../../model/dto/tisch.dto';
import { TischkategorieDto } from '../../../../model/dto/tischkategorie.dto';

@Component({
    selector: 'app-tisch-auswahl',
    templateUrl: './tisch-auswahl.component.html',
    styleUrls: ['./tisch-auswahl.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [IonContent, IonFooter, IonButton, NgClass],
})
export class TischAuswahlComponent {
    private data = inject(DataService);
    public onTischSelected = output<TischDto>();

    public tischkategorien = this.data.tischkategorien;
    public filtredTischkategorienToDisplay = computed(() => this.tischkategorien()?.filter((tischkategorie) => tischkategorie.aktiv) ?? []);
    public selectedTischkategorie = signal<TischkategorieDto | null>(null);
    public filtredTischeToDisplay = signal<TischDto[]>([]);

    constructor() {
        effect(() => {
            if (this.selectedTischkategorie() == null) {
                this.selectTischkategorie(this.tischkategorien()[0]);
            }

            this.filtredTischeToDisplay.set(this.data.tische().filter((tisch) => tisch.tischkategorien_id == this.selectedTischkategorie()?.id && tisch.aktiv) ?? []);
        });
    }

    public selectTischkategorie(tischkategorie: TischkategorieDto) {
        this.selectedTischkategorie.set(tischkategorie);
    }

    public selectTisch(tisch: TischDto) {
        this.onTischSelected.emit(tisch);
    }
}
