import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { catchError, retry } from 'rxjs';
import { Aufnehmer } from 'src/app/classes/aufnehmer.class';
import { Produkt } from 'src/app/classes/produkt.class';
import { Produktbereich } from 'src/app/classes/produktbereich.class';
import { Produkteinteilung } from 'src/app/classes/produkteinteilung.class';
import { Produktkategorie } from 'src/app/classes/produktkategorie.class';
import { Tisch } from 'src/app/classes/tisch.class';
import { Tischkategorie } from 'src/app/classes/tischkategorie.class';
import { Daten } from 'src/app/interfaces/daten';
import { DataLoadedReportModalComponent } from 'src/app/modals/data-loaded-report-modal/data-loaded-report-modal.component';
import { ErrorHandlingService } from '../error-handling/error-handling.service';
import { SettingsService } from '../settings/settings.service';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private modalController = inject(ModalController);
    private http = inject(HttpClient);
    private settings = inject(SettingsService);
    private errorHandling = inject(ErrorHandlingService);

    public loaded = computed<boolean>(() => this.loadedReport().filter(report => !report.loaded).length == 0);

    public loadedReport = computed<{ name: string, loaded: boolean, numberOfItems: number }[]>(() => [
        {
            name: "Aufnehmer",
            loaded: this.aufnehmer().length > 0,
            numberOfItems: this.aufnehmer().length
        },
        {
            name: "Produktbereiche",
            loaded: this.produktbereiche().length > 0,
            numberOfItems: this.produktbereiche().length
        },
        {
            name: "Produktkategorien",
            loaded: this.produktkategorien().length > 0,
            numberOfItems: this.produktkategorien().length
        },
        {
            name: "Produkteinteilungen",
            loaded: this.produkteinteilungen().length > 0,
            numberOfItems: this.produkteinteilungen().length
        },
        {
            name: "Produkte",
            loaded: this.produkte().length > 0,
            numberOfItems: this.produkte().length
        },
        {
            name: "Tischkategorien",
            loaded: this.tischkategorien().length > 0,
            numberOfItems: this.tischkategorien().length
        },
        {
            name: "Tische",
            loaded: this.tische().length > 0,
            numberOfItems: this.tische().length
        }
    ]);

    public loadedDatetime = computed<Date>(() => this.loaded() ? new Date() : null);

    public aufnehmer = signal<Aufnehmer[]>([]);
    public produktbereiche = signal<Produktbereich[]>([]);
    public produktkategorien = signal<Produktkategorie[]>([]);
    public produkteinteilungen = signal<Produkteinteilung[]>([]);
    public produkte = signal<Produkt[]>([]);
    public tischkategorien = signal<Tischkategorie[]>([]);
    public tische = signal<Tisch[]>([]);

    constructor() {
        this.loadAllLookupData().subscribe((data) => {
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
            initialBreakpoint: 1
        });
        modal.present();
    }

    public version: number = 0;
    public saved: Date | null = null;

    private loadAllLookupData() {
        return this.http
            .get<Daten>(`${this.settings.apiBaseUrl()}/daten/latest`)
            .pipe(
                retry(1),
                catchError((error) => this.errorHandling.globalApiErrorHandling(error))
            );
    }
}
