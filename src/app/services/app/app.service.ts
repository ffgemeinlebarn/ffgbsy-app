import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { Aufnehmer } from 'src/app/classes/aufnehmer.model';
import { Bestellung } from 'src/app/classes/bestellung.model';
import { SelectAufnehmerModalComponent } from 'src/app/modals/select-aufnehmer-modal/select-aufnehmer-modal.component';
import { environment } from 'src/environments/environment';
import { AvailabilityService } from '../availability/availability.service';
import { BestellungenService } from '../bestellungen/bestellungen.service';
import { BonsService } from '../bons/bons.service';
import { DataService } from '../data/data.service';
import { FrontendService } from '../frontend/frontend.service';
import { SettingsService } from '../settings/settings.service';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    private settings = inject(SettingsService);
    private frontend = inject(FrontendService);
    private data = inject(DataService);
    private bonsService = inject(BonsService);
    private availability = inject(AvailabilityService);
    private modalController = inject(ModalController);
    private bestellungenService = inject(BestellungenService);

    // State Management
    public readyToGo = computed<boolean>(() => this.aufnehmer() && this.deviceName() && this.availability.apiAvailability() && this.availability.lookupDataGrossAvailibility());
    public aufnehmer = signal<Aufnehmer>(null);
    public deviceName = computed<string>(() => this.settings.local().deviceName);
    public isAdmin = computed(() => this.settings.local().adminPin == environment.localAdminPin);

    // Manage new Bestellung
    public bestellung = signal<Bestellung>(null);

    constructor() {
        effect(() => {
            if (this.settings.local().deviceAufnehmerId && !this.aufnehmer()) {
                const aufnehmer = this.data.aufnehmer().find(a => a.id == this.settings.local().deviceAufnehmerId);
                if (aufnehmer) {
                    this.selectAufnehmer(aufnehmer);
                }
            }
        }, { allowSignalWrites: true });
    }

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
        this.settings.saveLocal({ ...this.settings.local(), deviceAufnehmerId: undefined }, true);
    }

    public selectAufnehmer(aufnehmer: Aufnehmer) {
        this.aufnehmer.set(aufnehmer);
        this.settings.saveLocal({ ...this.settings.local(), deviceAufnehmerId: aufnehmer.id }, true);
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

    public cancelBestellung() {
        this.bestellung.set(null);
    }

    public sendBestellung() {
        this.bestellungenService.create(this.bestellung()).subscribe({
            next: (bestellung) => {

                this.frontend.showToast("Bestellung erfolgreich angelegt!", 2000);
                this.bestellung.set(null);

                this.bonsService.druckBons(bestellung.bestellbons).subscribe({
                    next: (bons) => {
                        if (bons.filter(b => !b.success).length == 0) {
                            this.frontend.showToast("Alle Bons wurden erfolgreich gedruckt!", 2000);
                        } else {
                            this.frontend.showOkAlert('Fehler beim Drucken', 'Es konnten nicht alle Bons gedruckt werden!\n\nWeitere Details unter dem Menüpunkt "Bestellungen".');
                        }
                    },
                    error: (error) => {
                        this.frontend.showOkAlert('Fehler beim Drucken der Bons', error.message);
                    }
                });

            },
            error: (errResult) => {
                this.frontend.showOkAlert('Fehler beim Anlegen der Bestellung', errResult.error.error.description);
            }
        });
    }
}
