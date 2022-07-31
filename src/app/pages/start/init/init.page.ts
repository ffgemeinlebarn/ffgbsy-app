import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data/data.service';
import { Aufnehmer } from 'src/app/classes/aufnehmer.class';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { ActionSheetController } from '@ionic/angular';
import { FrontendService } from 'src/app/services/frontend/frontend.service';
import { BestellungenHandlerService } from 'src/app/services/bestellungen/bestellungen-handler.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { version } from 'src/environments/version';

@Component({
    selector: 'app-init',
    templateUrl: './init.page.html',
    styleUrls: ['./init.page.scss'],
})
export class InitPage implements OnInit {

    public version = version;
    public datenSynchronisierungLaeuft: boolean = false;

    public aufnehmer: Aufnehmer | null = null;

    public systemstatus: any = [];

    constructor(
        public actionSheetController: ActionSheetController,
        public bestellungsHandler: BestellungenHandlerService,
        public data: DataService,
        public settings: SettingsService,
        private router: Router,
        public frontend: FrontendService,
        private api: ApiService
    ) {
        this.data.ready.then(() => {

            // Check Version
            this.api.getCurrentVersion().subscribe((version) => {
                console.log('[FFGBSY]', 'Init ', 'Vergleiche Current mit local Version:', this.data.version, '==', version);

                if (this.data.version !== version) {
                    console.log('[FFGBSY]', 'Init ', 'Neuere Datenversion vorhanden!');
                    this.downloadData();
                }
            });

        });
    }

    public initComplete() {
        this.router.navigateByUrl('/neue-bestellung');
    }

    ngOnInit() { }

    public async downloadData() {
        await this.data.download();
    }

    public systemstatusAbrufen() {
        this.api.getSystemstatus().subscribe((data) => {

            const systemstatus = [
                {
                    text: 'API',
                    icon: data.api ? 'checkmark-circle' : 'alert',
                    cssClass: data.api ? 'systemstatus-success' : 'systemstatus-danger',
                    handler: () => { return false; }
                }
            ];

            for (const item of data.drucker) {
                systemstatus.push({
                    text: 'Drucker ' + item.drucker.name,
                    icon: item.result ? 'checkmark-circle' : 'alert',
                    cssClass: item.result ? 'systemstatus-success' : 'systemstatus-danger',
                    handler: () => { return false; }
                });
            }

            this.showSystemstatus(systemstatus);
        });
    }

    public async showSystemstatus(status) {
        const actionSheet = await this.actionSheetController.create({
            header: 'Systemstatus Kurzbericht',
            buttons: status
        });
        await actionSheet.present();
    }
}
