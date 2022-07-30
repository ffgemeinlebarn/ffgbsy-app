import { Component, OnInit, ViewChild } from '@angular/core';

// Services
import { DataService } from '../../../services/data/data.service';

// Classes
import { Aufnehmer } from 'src/app/classes/aufnehmer.class';
import { Geraet } from 'src/app/classes/geraet.class';

import { Storage } from '@ionic/storage';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { IonSelect, ActionSheetController } from '@ionic/angular';
import { FrontendService } from 'src/app/services/frontend/frontend.service';
import { HttpClient } from '@angular/common/http';
import { BestellungenHandlerService } from 'src/app/services/bestellungen/bestellungen-handler.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
    selector: 'app-init',
    templateUrl: './init.page.html',
    styleUrls: ['./init.page.scss'],
})
export class InitPage implements OnInit {

    public messageLineOne: string = "";
    public messageLineTwo: string = "";
    public datenSynchronisierungLaeuft: boolean = false;
    // public datenSynchronisiert: boolean = false;
    // public lokalesGeraetReady: boolean = false;

    public geraet: Geraet | null = null;
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
        this.messageLineOne = "Warte auf Synchronisierung der Daten.";
        this.messageLineTwo = "";

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
        this.messageLineOne = "Lade neue Daten vom Server ...";
        this.messageLineTwo = "";

        await this.data.download();

        this.messageLineOne = "Daten wurden aktualisiert!";
        this.messageLineTwo = "";
    }

    private setMessage(firstLine: string, secondLine: string): void {
        this.messageLineOne = firstLine;
        this.messageLineTwo = secondLine;
    }

    public systemstatusAbrufen() {
        this.api.getSystemstatus().subscribe((status) => {

            const systemstatus = [
                {
                    text: 'API',
                    icon: status.api.connected ? 'checkmark-circle' : 'alert',
                    cssClass: status.api.connected ? 'systemstatus-success' : 'systemstatus-danger',
                    handler: () => { return false; }
                }
            ];

            for (let i = 0; i < status.drucker.length; i++) {

                systemstatus.push({
                    text: 'Drucker ' + status.drucker[i].name,
                    icon: status.drucker[i].connected ? 'checkmark-circle' : 'alert',
                    cssClass: status.drucker[i].connected ? 'systemstatus-success' : 'systemstatus-danger',
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
