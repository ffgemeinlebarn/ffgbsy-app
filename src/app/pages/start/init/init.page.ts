import { NgClass, formatDate } from '@angular/common';
import { Component, Signal, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { InitTileComponent } from 'src/app/components/init-tile/init-tile.component';
import { AppService } from 'src/app/services/app/app.service';
import { AvailabilityService } from 'src/app/services/availability/availability.service';
import { version } from 'src/environments/version';
import { DataService } from '../../../services/data/data.service';

@Component({
    selector: 'ffgbsy-init',
    templateUrl: './init.page.html',
    styleUrls: ['./init.page.scss'],
    standalone: true,
    imports: [
        IonicModule,
        NgClass,
        RouterLink,
        InitTileComponent
    ],
})
export class InitPage {
    private app = inject(AppService);
    private availability = inject(AvailabilityService);

    public version = version;

    public aufnehmerNameForSubtitle: Signal<string> = computed(() => this.app.aufnehmer() ? `${this.app.aufnehmer()?.vorname} ${this.app.aufnehmer()?.nachname}` : "nicht ausgewählt");
    public deviceNameForSubtitle: Signal<string> = computed(() => this.app.deviceName() ? this.app.deviceName() : "Der Gerätename fehlt!");
    public dataLastSyncedForSubtitle = this.availability.lookupDataGrossAvailibilityDatetime;
    public apiAvailabilityStatusForSubtitle = computed(() => this.availability.apiAvailability() ? 'Schnittstelle erreichbar!' : 'Schnittstelle nicht erreichbar!');
    public druckerAvailabilityStatusForSubtitle = computed(() => this.availability.druckerGrossAvailability() ? 'Alle Drucker erreichbar!' : 'Fehler bei den Drucker-Verbindungen');

    public isAufnehmerSelected = computed(() => this.app.aufnehmer() ? true : false);
    public isDeviceNameSet = computed(() => this.app.deviceName() ? true : false);
    public isLookupDataAvailable = this.availability.lookupDataGrossAvailibility;
    public isApiAvailable = this.availability.apiAvailability;
    public areDruckerAvailable = this.availability.druckerGrossAvailability;
    public readyToGo = this.app.readyToGo;

    public selectAufnehmer() {
        this.app.showSelectAufnehmerModal();
    }

    public dataShowAvailabilityDetails() {
        this.availability.showDetailsModal();
    }
}
