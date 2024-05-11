import { Injectable, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Daten } from 'src/app/interfaces/daten';
import { SettingsService } from '../settings/settings.service';
import { Aufnehmer } from 'src/app/classes/aufnehmer.class';
import { Produktbereich } from 'src/app/classes/produktbereich.class';
import { Produktkategorie } from 'src/app/classes/produktkategorie.class';
import { Produkt } from 'src/app/classes/produkt.class';
import { Tischkategorie } from 'src/app/classes/tischkategorie.class';
import { Tisch } from 'src/app/classes/tisch.class';
import { ApiService } from '../api/api.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { FrontendService } from '../frontend/frontend.service';
import { AufnehmerService } from '../aufnehmer/aufnehmer.service';
import { forkJoin } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { DataLoadedReportModalComponent } from 'src/app/components/data-loaded-report/data-loaded-report-modal/data-loaded-report-modal.component';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private modalController = inject(ModalController);
    private aufnehmerService = inject(AufnehmerService);

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
            name: "Produkte",
            loaded: this.produkte().length > 0,
            numberOfItems: this.produkte().length
        },
        {
            name: "tischkategorien",
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

    public aufnehmer = toSignal(this.aufnehmerService.readAll(), { initialValue: [] });
    public produktbereiche = signal<Produktbereich[]>([]);
    public produktkategorien = signal<Produktkategorie[]>([]);
    public produkte = signal<Produkt[]>([]);
    public tischkategorien = signal<Tischkategorie[]>([]);
    public tische = signal<Tisch[]>([]);
    // public produktbereiche = toSignal(this.aufnehmerService.readAll(), { initialValue: [] });
    // public produktkategorien = toSignal(this.aufnehmerService.readAll(), { initialValue: [] });
    // public produkte = toSignal(this.aufnehmerService.readAll(), { initialValue: [] });
    // public tischkategorien = toSignal(this.aufnehmerService.readAll(), { initialValue: [] });
    // public tische = toSignal(this.aufnehmerService.readAll(), { initialValue: [] });

    // public ready = toSignal(forkJoin([this.aufnehmerService.readAll()]));
    // private storageKey = 'data';

    // public produktbereiche: Produktbereich[];
    // public produktkategorien: Produktkategorie[];
    // public produkte: Produkt[];
    // public tischkategorien: Tischkategorie[];
    // public tische: Tisch[];


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

    // constructor() {
    //     this.loadDataFromApi();
    //     // this.loadfromStorage();
    // }

    // public loadDataFromApi() {
    //     //this.aufnehmer = toSignal(this.aufnehmerService.readAll());
    // }

    // public loadfromStorage() {
    //     // this.ready = new Promise((resolve, reject) => this.settings.ready.then(() => this.storage.get(this.settings.StoragePrefix + this.storageKey).then((jsonObject: any) => {

    //     //     // this.logger.debug('[Data Service] - Loaded from Storage')

    //     //     if (jsonObject == null) {
    //     //         // this.logger.debug('[Data Service] - Keine lokalen Daten vorhanden!')
    //     //     } else {

    //     //         const dataObject = <{
    //     //             saved: Date,
    //     //             data: any
    //     //         }>JSON.parse(jsonObject);

    //     //         this.aufnehmer = signal(dataObject.data.aufnehmer);
    //     //         this.produktbereiche = dataObject.data.produktbereiche;
    //     //         this.produktkategorien = dataObject.data.produktkategorien;
    //     //         this.produkte = dataObject.data.produkte;
    //     //         this.tischkategorien = dataObject.data.tischkategorien;
    //     //         this.tische = dataObject.data.tische;
    //     //         this.version = dataObject.data.version;

    //     //         this.saved = new Date(dataObject.saved);
    //     //     }

    //     //     resolve(this.saved);
    //     // })));
    // }

    // public async download() {

    //     // this.logger.debug('[Data Service] - Start Download!')

    //     this.api
    //         .getDaten()
    //         .subscribe({
    //             next: (data: Daten) => {

    //                 const saved = new Date();

    //                 this.storage.set(this.settings.localStoragePrefix + this.storageKey, JSON.stringify({
    //                     saved,
    //                     data
    //                 }));

    //                 // this.aufnehmer.set(data.aufnehmer);
    //                 this.produktbereiche = data.produktbereiche;
    //                 this.produktkategorien = data.produktkategorien;
    //                 this.produkte = data.produkte;
    //                 this.tischkategorien = data.tischkategorien;
    //                 this.tische = data.tische;
    //                 this.version = data.version;

    //                 this.saved = saved;

    //                 // this.ready = Promise.resolve(saved);

    //             },
    //             error: () => this.frontend.toast("Daten wurden nicht synchronisiert!")
    //         });
    // }

    getProduktById(id: number) {
        for (let p of this.produkte()) {
            if (p.id == id) { return p; }
        }
        return null;
    }

    getProduktByIds(ids: Array<number>) {
        let arr: Array<Produkt>;
        for (let p of this.produkte()) {
            if (ids.indexOf(p.id)) { arr.push(p) }
        }
        return arr;
    }

}
