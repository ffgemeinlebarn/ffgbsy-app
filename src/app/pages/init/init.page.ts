import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonButton, IonContent, IonHeader, IonIcon, IonMenuButton, IonToolbar } from '@ionic/angular/standalone';
import { version } from '../../../environments/version';
import { AppService } from '../../data/app.service';
import { AvailabilityService } from '../../data/availability.service';
import { InitTileComponent } from '../../ui/init-tile/init-tile.component';

@Component({
    selector: 'ffgbsy-init',
    templateUrl: './init.page.html',
    styleUrls: ['./init.page.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [IonIcon, IonButton, IonHeader, IonToolbar, IonMenuButton, IonContent, RouterLink, InitTileComponent],
})
export class InitPage {
    private readonly appService = inject(AppService);
    private readonly availabilityService = inject(AvailabilityService);

    public readonly version = version;

    public readonly aufnehmerNameForSubtitle = computed(() =>
        this.appService.aufnehmer() ? `${this.appService.aufnehmer()?.vorname} ${this.appService.aufnehmer()?.nachname}` : 'nicht ausgewählt',
    );
    public readonly deviceNameForSubtitle = computed(() => (this.appService.deviceName() ? this.appService.deviceName() : 'Der Gerätename fehlt!'));
    public readonly dataLastSyncedForSubtitle = this.availabilityService.lookupDataGrossAvailibilityDatetime;
    public readonly apiAvailabilityStatusForSubtitle = computed(() =>
        this.availabilityService.apiAvailability() ? 'Schnittstelle erreichbar!' : 'Schnittstelle nicht erreichbar!',
    );
    public readonly druckerAvailabilityStatusForSubtitle = computed(() =>
        this.availabilityService.druckerGrossAvailability()
            ? 'Alle Drucker erreichbar!'
            : `${this.availabilityService.druckerAvailabilities().filter((c) => c.isSuccessful()).length} von ${this.availabilityService.druckerAvailabilities().length} Drucker erreichbar!`,
    );

    public readonly isAufnehmerSelected = computed(() => (this.appService.aufnehmer() ? true : false));
    public readonly isDeviceNameSet = computed(() => (this.appService.deviceName() ? true : false));
    public readonly isLookupDataAvailable = this.availabilityService.lookupDataGrossAvailibility;
    public readonly isApiAvailable = this.availabilityService.apiAvailability;
    public readonly areDruckerAvailable = this.availabilityService.druckerGrossAvailability;
    public readonly readyToGo = this.appService.readyToGo;

    public selectAufnehmer() {
        this.appService.showSelectAufnehmerModal().subscribe();
    }
}
