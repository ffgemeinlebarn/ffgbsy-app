import { Component, Signal, computed, inject } from '@angular/core';
import { DataService } from '../../../services/data/data.service';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { version } from 'src/environments/version';
import { NgClass, DatePipe } from '@angular/common';
import { InitTileComponent } from 'src/app/components/init-tile/init-tile.component';
import { AppService } from 'src/app/services/app/app.service';
import { formatDate } from "@angular/common";
import { AvailabilityService } from 'src/app/services/availability/availability.service';

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
    private data = inject(DataService);
    private availability = inject(AvailabilityService);

    public version = version;

    public aufnehmerNameForSubtitle: Signal<string> = computed(() => this.app.aufnehmer() ? `${this.app.aufnehmer()?.vorname} ${this.app.aufnehmer()?.nachname}` : "nicht ausgewählt");
    public deviceNameForSubtitle: Signal<string> = computed(() => this.app.deviceName() ? this.app.deviceName() : "Der Gerätename fehlt!");
    public dataLastSyncedForSubtitle = computed(() => this.data.loaded() ? formatDate(this.data.loadedDatetime(), 'dd.MM.YYYY HH:mm:ss', 'en-US') : "Daten nicht vollständig geladen!");
    public availabilityStatusForSubtitle = computed(() => this.availability.all() ? 'Alle Systeme verfügbar!' : 'Systeme nicht vollständig erreichbar!');

    public aufnehmerSelected = computed(() => this.app.aufnehmer() ? true : false);
    public deviceNameSet = computed(() => this.app.deviceName() ? true : false);
    public dataLoaded = this.data.loaded;
    public allSystemsAvailable = this.availability.all;
    public readyToGo = this.app.readyToGo;

    public selectAufnehmer() {
        this.app.showSelectAufnehmerModal();
    }

    public dataShowLoadedDetails() {
        this.data.showLoadedReport();
    }

    public dataShowAvailabilityDetails() {
        this.availability.showDetailsModal();
    }
}
