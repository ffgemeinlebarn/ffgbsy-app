import { Injectable, computed, inject, signal } from '@angular/core';
import { Aufnehmer } from 'src/app/classes/aufnehmer.model';
import { SettingsService } from '../settings/settings.service';
import { environment } from 'src/environments/environment';
import { DataService } from '../data/data.service';
import { AvailabilityService } from '../availability/availability.service';
import { ModalController } from '@ionic/angular/standalone';
import { SelectAufnehmerModalComponent } from 'src/app/modals/select-aufnehmer-modal/select-aufnehmer-modal.component';
import { Bestellung } from 'src/app/classes/bestellung.model';
import { Tisch } from 'src/app/classes/tisch.class';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    private settings = inject(SettingsService);
    private data = inject(DataService);
    private availability = inject(AvailabilityService);
    private modalController = inject(ModalController);

    // State Management
    public readyToGo = computed<boolean>(() => this.aufnehmer() && this.deviceName() && this.availability.apiAvailability() && this.availability.lookupDataGrossAvailibility());
    public aufnehmer = signal<Aufnehmer>(null);
    public deviceName = computed<string>(() => this.settings.local().deviceName);
    public isAdmin = computed(() => this.settings.local().adminPin == environment.localAdminPin);

    // Manage new Bestellung
    public bestellung = signal<Bestellung>(null);

    public async showSelectAufnehmerModal() {
        const modal = await this.modalController.create({
            component: SelectAufnehmerModalComponent,
            canDismiss: true,
            breakpoints: [0.1, 0.5, 1],
            initialBreakpoint: 1
        });
        modal.present();
    }

    public clearAufnehmer() {
        this.aufnehmer.set(null);
    }

    public selectAufnehmer(aufnehmer: Aufnehmer) {
        this.aufnehmer.set(aufnehmer);
    }

    public createBestellung() {
        if (this.bestellung()) {
            throw new Error("Es besteht eine begonnene Bestellung. Es kann daher keine neue Bestellung gestartet werden.");
        }

        const bestellung = new Bestellung();
        bestellung.aufnehmer = this.aufnehmer();
        bestellung.device_name = this.deviceName();
        bestellung.status = 'tischauswahl';

        this.bestellung.set(bestellung);
    }

    public setTischOfBestellung(tisch: Tisch) {
        this.bestellung().tisch = tisch;
        this.bestellung().setTimestampBegonnen();
    }

    public cancelBestellung() {
        this.bestellung.set(null);
    }

    public sendBestellung() {
        console.log("Call the API...");
    }
}
