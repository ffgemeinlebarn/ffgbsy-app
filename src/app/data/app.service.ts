import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { BestellungspositionEditModalComponent } from 'src/app/feature/bestellungsposition-edit-modal/bestellungsposition-edit-modal.component';
import { SelectAufnehmerModalComponent } from 'src/app/feature/select-aufnehmer-modal/select-aufnehmer-modal.component';
import { IAufnehmer } from 'src/app/model/aufnehmer.model';
import { Bestellposition } from 'src/app/model/bestellposition.model';
import { Bestellung } from 'src/app/model/bestellung.model';
import { environment } from 'src/environments/environment';
import { DataService } from '../data/data.service';
import { AvailabilityService } from './availability.service';
import { BestellungenService } from './bestellungen.service';
import { BonsService } from './bons.service';
import { FrontendService } from './frontend.service';
import { SettingsService } from './settings.service';

@Injectable({
    providedIn: 'root',
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
    public readyToGo = computed<boolean>(
        () =>
            this.aufnehmer() &&
            this.deviceName() &&
            this.availability.apiAvailability() &&
            this.availability.lookupDataGrossAvailibility()
    );
    public aufnehmer = signal<IAufnehmer>(null);
    public deviceName = computed<string>(
        () => this.settings.local().deviceName
    );
    public isAdmin = computed(
        () => this.settings.local().adminPin == environment.localAdminPin
    );

    // Manage new Bestellung
    public bestellung = signal<Bestellung>(null);

    constructor() {
        effect(
            () => {
                if (
                    this.settings.local().deviceAufnehmerId &&
                    !this.aufnehmer()
                ) {
                    const aufnehmer = this.data
                        .aufnehmer()
                        .find(
                            (a) =>
                                a.id == this.settings.local().deviceAufnehmerId
                        );
                    if (aufnehmer) {
                        this.selectAufnehmer(aufnehmer);
                    }
                }
            },
            { allowSignalWrites: true }
        );
    }

    public async showSelectAufnehmerModal() {
        const modal = await this.modalController.create({
            component: SelectAufnehmerModalComponent,
            canDismiss: true,
            breakpoints: [0.1, 0.5, 1],
            initialBreakpoint: 1,
        });
        modal.present();
    }

    public async editBestellposition(bestellposition: Bestellposition) {
        const modal = await this.modalController.create({
            component: BestellungspositionEditModalComponent,
            componentProps: {
                bestellposition: bestellposition,
            },
            cssClass: 'classic-modal',
            showBackdrop: true,
            backdropDismiss: false,
            animated: true,
        });

        modal.onDidDismiss().then((data: { data: null | Bestellposition }) => {
            if (data.data == null) {
                this.bestellung.update((bestellung) => {
                    bestellung.bestellpositionen =
                        bestellung.bestellpositionen.filter(
                            (b) => b != bestellposition
                        );
                    return bestellung;
                });
            }
        });

        return modal.present();
    }

    public async clearAufnehmer() {
        await this.settings.saveLocal(
            { ...this.settings.local(), deviceAufnehmerId: null },
            true
        );
        this.aufnehmer.set(null);
    }

    public selectAufnehmer(aufnehmer: IAufnehmer) {
        this.aufnehmer.set(aufnehmer);
        this.settings.saveLocal(
            {
                ...this.settings.local(),
                deviceAufnehmerId: this.settings.local().deviceIsPrivate
                    ? aufnehmer.id
                    : null,
            },
            true
        );
    }

    public createBestellung() {
        if (this.bestellung()) {
            throw new Error(
                'Es besteht eine begonnene Bestellung. Es kann daher keine neue Bestellung gestartet werden.'
            );
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
                this.frontend.showToast(
                    'Bestellung erfolgreich angelegt!',
                    2000
                );
                this.bestellung.set(null);

                this.bonsService
                    .druckBonsOfBestellungById(bestellung.id)
                    .subscribe({
                        next: (bons) => {
                            if (bons.filter((b) => !b.success).length == 0) {
                                this.frontend.showToast(
                                    'Alle Bons wurden erfolgreich gedruckt!',
                                    2000
                                );
                            } else {
                                this.frontend.showOkAlert(
                                    'Fehler beim Drucken',
                                    'Es konnten nicht alle Bons gedruckt werden!\n\nWeitere Details unter dem Menüpunkt "Bestellungen".'
                                );
                            }
                        },
                        error: (error) => {
                            this.frontend.showOkAlert(
                                'Fehler beim Drucken der Bons',
                                error.message
                            );
                        },
                    });
            },
            error: (errrorResponse) => {
                if (
                    errrorResponse.status == 400 &&
                    errrorResponse.error.error.description ==
                        'AvailabilityCheck' &&
                    !errrorResponse.error.error.success
                ) {
                    const moreThanOne =
                        errrorResponse.error.error.data.checks.length > 1;
                    const messages = errrorResponse.error.error.data.checks
                        .map((check, i) =>
                            moreThanOne
                                ? `${i + 1}) ${check.message}`
                                : check.message
                        )
                        .join(' ');

                    this.frontend.showOkAlert(
                        'Fehler beim Anlegen der Bestellung',
                        messages
                    );
                } else {
                    this.frontend.showOkAlert(
                        'Fehler beim Anlegen der Bestellung',
                        errrorResponse.error.error.description
                    );
                }
            },
        });
    }
}
