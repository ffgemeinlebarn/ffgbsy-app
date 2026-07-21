import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { catchError, from, Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { DataService } from '../data/data.service';
import { BestellungspositionEditModalComponent } from '../feature/bestellungsposition-edit-modal/bestellungsposition-edit-modal.component';
import { SelectAufnehmerModalComponent } from '../feature/select-aufnehmer-modal/select-aufnehmer-modal.component';
import { Abrechnung } from '../model/business/abrechnung.model';
import { Bestellposition } from '../model/business/bestellposition.model';
import { Bestellung } from '../model/business/bestellung.model';
import { BestellungDto } from '../model/dto/bestellung.dto';
import { PersonDto } from '../model/dto/person.dto';
import { BestellungenApiService } from './api/bestellungen-api.service';
import { BonsApiService } from './api/bons-api.service';
import { AvailabilityService } from './availability.service';
import { FrontendService } from './frontend.service';
import { SettingsService } from './settings.service';

@Injectable({
    providedIn: 'root',
})
export class AppService {
    private readonly settings = inject(SettingsService);
    private readonly frontend = inject(FrontendService);
    private readonly data = inject(DataService);
    private readonly bonsApiService = inject(BonsApiService);
    private readonly availability = inject(AvailabilityService);
    private readonly modalController = inject(ModalController);
    private readonly bestellungenApiService = inject(BestellungenApiService);

    // State Management
    public readonly readyToGo = computed<boolean>(() => this.aufnehmer() && this.deviceName() && this.availability.apiAvailability() && this.availability.lookupDataGrossAvailibility());
    public readonly aufnehmer = signal<PersonDto | null>(null);
    public readonly deviceName = computed<string>(() => this.settings.local().deviceName);
    public readonly isAdmin = computed(() => this.settings.local().adminPin == environment.localAdminPin);
    public readonly isAbrechner = computed(() => this.settings.local().abrechnerPin == environment.localAbrechnerPin);
    public readonly bonDebug = computed(() => this.settings.local().bonDebugMenu);

    // Editing
    public readonly bestellung = signal<Bestellung>(null); // Current Bestellung
    public readonly bestellposition = signal<Bestellposition>(null); // Current Bestellposition, that is open in Modal for Editing
    public readonly abrechnung = signal<Abrechnung>(null); // Current Abrechnung

    constructor() {
        effect(() => {
            if (this.settings.local().deviceAufnehmerId && !this.aufnehmer()) {
                const aufnehmer = this.data.aufnehmer().find((a) => a.id == this.settings.local().deviceAufnehmerId);
                if (aufnehmer) {
                    this.selectAufnehmer(aufnehmer);
                }
            }
        });

        // Update Bestellung on Edit specific Bestellposition
        effect(() => {
            if (this.bestellposition()) {
                console.debug('[FFGBSY]', 'AppService', '(Current) Bestellposition changed, Local Key =', this.bestellposition().localKey);

                this.bestellung.update((bestellung) => {
                    const index = bestellung.bestellpositionen().findIndex((b) => b.localKey == this.bestellposition().localKey);

                    bestellung.bestellpositionen.update((bestellpositionen) => {
                        bestellpositionen[index] = this.bestellposition();
                        return bestellpositionen;
                    });

                    return bestellung;
                });
            }
        });
    }

    public showSelectAufnehmerModal() {
        return from(
            this.modalController.create({
                component: SelectAufnehmerModalComponent,
                canDismiss: true,
                breakpoints: [0.1, 0.5, 1],
                initialBreakpoint: 1,
            }),
        ).pipe(tap((m) => m.present()));
    }

    public editBestellposition(bestellposition: Bestellposition) {
        this.bestellposition.set(bestellposition);
        this.frontend.showModal(BestellungspositionEditModalComponent).subscribe(() => this.bestellposition.set(null));
    }

    public async clearAufnehmer() {
        await this.settings.saveLocal({ ...this.settings.local(), deviceAufnehmerId: null }, true);
        this.aufnehmer.set(null);
    }

    public selectAufnehmer(aufnehmer: PersonDto) {
        this.aufnehmer.set(aufnehmer);
        this.settings.saveLocal(
            {
                ...this.settings.local(),
                deviceAufnehmerId: this.settings.local().deviceIsPrivate ? aufnehmer.id : null,
            },
            true,
        );
    }

    public createBestellung() {
        if (this.bestellung()) {
            throw new Error('Es besteht eine begonnene Bestellung. Es kann daher keine neue Bestellung gestartet werden.');
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
        this.bestellungenApiService
            .create(this.bestellung().toDto())
            .pipe(catchError((e) => this.handleCreateBestellungError(e)))
            .subscribe((bestellung: BestellungDto) => {
                if (bestellung) {
                    this.frontend.showToast('Bestellung erfolgreich angelegt!', 2000);
                    this.bestellung.set(null);

                    this.bonsApiService.druckBonsOfBestellungById(bestellung.id).subscribe({
                        next: (bons) => {
                            if (bons.filter((b) => !b.success).length == 0) {
                                this.frontend.showToast('Alle Bons wurden erfolgreich gedruckt!', 2000);
                            } else {
                                this.frontend.showOkAlert('Fehler beim Drucken', 'Es konnten nicht alle Bons gedruckt werden!\n\nWeitere Details unter dem Menüpunkt "Bestellungen".');
                            }
                        },
                        error: (error) => {
                            this.frontend.showOkAlert('Fehler beim Drucken der Bons', error.message);
                        },
                    });
                }
            });
    }

    private handleCreateBestellungError: (errorResponse: any) => Observable<any> = (errorResponse: any) => {
        const err = errorResponse.error.error;

        if (errorResponse.status == 400 && err.description == 'AvailabilityCheck' && !err.success) {
            const moreThanOne = err.data.checks.length > 1;
            const messages = err.data.checks.map((check, i) => (moreThanOne ? `${i + 1}) ${check.message}` : check.message)).join(' ');

            this.frontend.showOkAlert('Fehler beim Anlegen der Bestellung', messages);
        } else {
            this.frontend.showOkAlert('Fehler beim Anlegen der Bestellung', err?.description);
        }

        return of(false);
    };
}
