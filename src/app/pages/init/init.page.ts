import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonButton, IonContent, IonHeader, IonMenuButton, IonToolbar } from '@ionic/angular/standalone';
import { AppService } from 'src/app/data/app.service';
import { AvailabilityService } from 'src/app/data/availability.service';
import { InitTileComponent } from 'src/app/ui/init-tile/init-tile.component';
import { version } from 'src/environments/version';

@Component({
    selector: 'ffgbsy-init',
    templateUrl: './init.page.html',
    styleUrls: ['./init.page.scss'],
    imports: [IonButton, IonHeader, IonToolbar, IonMenuButton, IonContent, RouterLink, InitTileComponent],
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
        this.availabilityService.druckerGrossAvailability() ? 'Alle Drucker erreichbar!' : 'Fehler bei den Drucker-Verbindungen',
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
