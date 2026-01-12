import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { DataLoadedReportModalComponent } from 'src/app/feature/data-loaded-report-modal/data-loaded-report-modal.component';
import { IAufnehmer } from 'src/app/model/i-aufnehmer.model';
import { IDaten } from 'src/app/model/i-daten.interface';
import { IProdukt } from 'src/app/model/i-produkt.interface';
import { IProduktbereich } from 'src/app/model/i-produktbereich.interface';
import { IProdukteinteilung } from 'src/app/model/i-produkteinteilung.interface';
import { IProduktkategorie } from 'src/app/model/i-produktkategorie.interface';
import { ITisch } from 'src/app/model/i-tisch.interface';
import { ITischkategorie } from 'src/app/model/i-tischkategorie.interface';
import { SettingsService } from './settings.service';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    private modalController = inject(ModalController);
    private http = inject(HttpClient);
    private settings = inject(SettingsService);

    public aufnehmer = signal<IAufnehmer[]>([]);
    public produktbereiche = signal<IProduktbereich[]>([]);
    public produktkategorien = signal<IProduktkategorie[]>([]);
    public produkteinteilungen = signal<IProdukteinteilung[]>([]);
    public produkte = signal<IProdukt[]>([]);
    public tischkategorien = signal<ITischkategorie[]>([]);
    public tische = signal<ITisch[]>([]);

    public lookupDataSetted = computed(
        () => this.aufnehmer() && this.produktbereiche() && this.produktkategorien() && this.produkteinteilungen() && this.produkte() && this.tischkategorien() && this.tische(),
    );

    constructor() {
        this.load();
    }

    public load() {
        this.http.get<IDaten>(`${this.settings.apiBaseUrl()}/daten/latest`).subscribe((data) => {
            this.aufnehmer.set(data.aufnehmer);
            this.produktbereiche.set(data.produktbereiche);
            this.produktkategorien.set(data.produktkategorien);
            this.produkteinteilungen.set(data.produkteinteilungen);
            this.produkte.set(data.produkte);
            this.tischkategorien.set(data.tischkategorien);
            this.tische.set(data.tische);
        });
    }

    public async showLoadedReport() {
        const modal = await this.modalController.create({
            component: DataLoadedReportModalComponent,
            canDismiss: true,
            breakpoints: [0.1, 0.5, 1],
            initialBreakpoint: 1,
        });
        modal.present();
    }

    public version: number = 0;
    public saved: Date | null = null;
}
