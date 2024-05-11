import { Injectable, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { Produktbereich } from 'src/app/classes/produktbereich.class';
import { Produktkategorie } from 'src/app/classes/produktkategorie.class';
import { Produkt } from 'src/app/classes/produkt.class';
import { Tischkategorie } from 'src/app/classes/tischkategorie.class';
import { Tisch } from 'src/app/classes/tisch.class';
import { toSignal } from '@angular/core/rxjs-interop';
import { AufnehmerService } from '../aufnehmer/aufnehmer.service';
import { ModalController } from '@ionic/angular';
import { DataLoadedReportModalComponent } from 'src/app/components/data-loaded-report-modal/data-loaded-report-modal.component';
import { ProduktbereicheService } from '../produktbereiche/produktbereiche.service';
import { ProduktkategorienService } from '../produktkategorien/produktkategorien.service';
import { ProdukteService } from '../produkte/produkte.service';
import { TischkategorienService } from '../tischkategorien/tischkategorien.service';
import { TischeService } from '../tische/tische.service';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private modalController = inject(ModalController);
    private aufnehmerService = inject(AufnehmerService);
    private produktbereicheService = inject(ProduktbereicheService);
    private produktkategorienService = inject(ProduktkategorienService);
    private produkteService = inject(ProdukteService);
    private tischkategorienService = inject(TischkategorienService);
    private tischeService = inject(TischeService);

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

    public aufnehmer = toSignal(this.aufnehmerService.readAll(), { initialValue: [] });
    public produktbereiche = toSignal(this.produktbereicheService.readAll(), { initialValue: [] });
    public produktkategorien = toSignal(this.produktkategorienService.readAll(), { initialValue: [] });
    public produkte = toSignal(this.produkteService.readAll(), { initialValue: [] });
    public tischkategorien = toSignal(this.tischkategorienService.readAll(), { initialValue: [] });
    public tische = toSignal(this.tischeService.readAll(), { initialValue: [] });

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
