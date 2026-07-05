import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { DataLoadedReportModalComponent } from '../feature/data-loaded-report-modal/data-loaded-report-modal.component';
import { AufnehmerDto } from '../model/dto/aufnehmer.dto';
import { IDaten } from '../model/i-daten.interface';
import { IProdukt } from '../model/i-produkt.interface';
import { IProduktbereich } from '../model/i-produktbereich.interface';
import { IProdukteinteilung } from '../model/i-produkteinteilung.interface';
import { IProduktkategorie } from '../model/i-produktkategorie.interface';
import { ITisch } from '../model/i-tisch.interface';
import { ITischkategorie } from '../model/i-tischkategorie.interface';
import { SettingsService } from './settings.service';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    private modalController = inject(ModalController);
    private http = inject(HttpClient);
    private settings = inject(SettingsService);

    public aufnehmer = signal<AufnehmerDto[]>([]);
    public produktbereiche = signal<IProduktbereich[]>([]);
    public produktkategorien = signal<IProduktkategorie[]>([]);
    public produkteinteilungen = signal<IProdukteinteilung[]>([]);
    public produkte = signal<IProdukt[]>([]);
    public tischkategorien = signal<ITischkategorie[]>([]);
    public tische = signal<ITisch[]>([]);

    public lookupDataSetted = computed(() => this.aufnehmer() && this.produktbereiche() && this.produktkategorien() && this.produkteinteilungen() && this.produkte() && this.tischkategorien() && this.tische());

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
