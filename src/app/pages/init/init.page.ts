import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
    IonButton,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonTitle,
    IonToolbar,
} from '@ionic/angular/standalone';
import { AppService } from 'src/app/data/app.service';
import { AvailabilityService } from 'src/app/data/availability.service';
import { InitTileComponent } from 'src/app/ui/init-tile/init-tile.component';
import { version } from 'src/environments/version';

@Component({
    selector: 'ffgbsy-init',
    templateUrl: './init.page.html',
    styleUrls: ['./init.page.scss'],
    imports: [
        IonTitle,
        IonButton,
        IonHeader,
        IonToolbar,
        IonMenuButton,
        IonContent,
        RouterLink,
        InitTileComponent,
        IonTitle,
    ],
})
export class InitPage {
    private readonly appService = inject(AppService);
    private readonly availabilityService = inject(AvailabilityService);

    public version = version;

    public aufnehmerNameForSubtitle = computed(() =>
        this.appService.aufnehmer()
            ? `${this.appService.aufnehmer()?.vorname} ${this.appService.aufnehmer()?.nachname}`
            : 'nicht ausgewählt',
    );
    public deviceNameForSubtitle = computed(() =>
        this.appService.deviceName() ? this.appService.deviceName() : 'Der Gerätename fehlt!',
    );
    public dataLastSyncedForSubtitle = this.availabilityService.lookupDataGrossAvailibilityDatetime;
    public apiAvailabilityStatusForSubtitle = computed(() =>
        this.availabilityService.apiAvailability()
            ? 'Schnittstelle erreichbar!'
            : 'Schnittstelle nicht erreichbar!',
    );
    public druckerAvailabilityStatusForSubtitle = computed(() =>
        this.availabilityService.druckerGrossAvailability()
            ? 'Alle Drucker erreichbar!'
            : 'Fehler bei den Drucker-Verbindungen',
    );

    public isAufnehmerSelected = computed(() => (this.appService.aufnehmer() ? true : false));
    public isDeviceNameSet = computed(() => (this.appService.deviceName() ? true : false));
    public isLookupDataAvailable = this.availabilityService.lookupDataGrossAvailibility;
    public isApiAvailable = this.availabilityService.apiAvailability;
    public areDruckerAvailable = this.availabilityService.druckerGrossAvailability;
    public readyToGo = this.appService.readyToGo;

    public selectAufnehmer() {
        this.appService.showSelectAufnehmerModal();
    }

    public dataShowAvailabilityDetails() {
        this.availabilityService.showDetailsModal();
    }
}
