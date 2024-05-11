import { Component, OnInit, Signal, computed, effect, inject, signal } from '@angular/core';
import { DataService } from '../../../services/data/data.service';
import { Aufnehmer } from 'src/app/classes/aufnehmer.class';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { ActionSheetController, IonicModule } from '@ionic/angular';
import { FrontendService } from 'src/app/services/frontend/frontend.service';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { version } from 'src/environments/version';
import { NgClass, NgIf, DatePipe } from '@angular/common';
import { InitTileComponent } from 'src/app/components/init-tile/init-tile.component';
import { AppService } from 'src/app/services/app/app.service';
import { SettingsPage } from '../../settings/settings.page';
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
        NgIf,
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
    public availabilityStatusForSubtitle = computed(() => this.availability.all() ? 'Alle Systeme verfügbar!' : 'Systeme nicht vollständig erreichbar!');;

    public dataShowLoadedDetails() {
        this.data.showLoadedReport();
    }
    public dataShowAvailabilityDetails() {
        this.availability.showDetailsModal();
    }

    // constructor() {

    //     // this.data.ready.then(() => {

    //     //     // Check Version
    //     //     this.api.getCurrentVersion().subscribe((resultedVersion: number) => {
    //     //         // this.logger.debug('[Init Page] Vergleiche Current mit local Version', this.data.version, '==', resultedVersion);

    //     //         if (this.data.version !== resultedVersion) {
    //     //             // this.logger.debug('[Init Page] Neuere Datenversion vorhanden!', 'Neu: ', resultedVersion);
    //     //             this.downloadData();
    //     //         }
    //     //     });

    //     // });
    // }

    // public initComplete() {
    //     this.router.navigateByUrl('/neue-bestellung');
    // }

    // public async downloadData() {
    //     await this.data.download();
    // }

    // public systemstatusAbrufen() {
    //     this.api.getSystemstatus().subscribe((data) => {

    //         const systemstatus = [
    //             {
    //                 text: 'API',
    //                 icon: data.api ? 'checkmark-circle' : 'alert',
    //                 cssClass: data.api ? 'systemstatus-success' : 'systemstatus-danger',
    //                 handler: () => { return false; }
    //             }
    //         ];

    //         for (const item of data.drucker) {
    //             systemstatus.push({
    //                 text: 'Drucker ' + item.drucker.name,
    //                 icon: item.result ? 'checkmark-circle' : 'alert',
    //                 cssClass: item.result ? 'systemstatus-success' : 'systemstatus-danger',
    //                 handler: () => { return false; }
    //             });
    //         }

    //         this.showSystemstatus(systemstatus);
    //     });
    // }

    // public async showSystemstatus(status) {
    //     const actionSheet = await this.actionSheetController.create({
    //         header: 'Systemstatus Kurzbericht',
    //         buttons: status
    //     });
    //     await actionSheet.present();
    // }
}
