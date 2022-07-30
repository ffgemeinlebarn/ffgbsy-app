import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { BestellungenHandlerService } from 'src/app/services/bestellungen/bestellungen-handler.service';
import { FrontendService } from 'src/app/services/frontend/frontend.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
    constructor(
        public bestellungsHandler: BestellungenHandlerService,
        public data: DataService,
        public settings: SettingsService,
        public bestellungen: BestellungenHandlerService,
        public frontend: FrontendService
    ) { }

    ngOnInit(): void { /* Complaint */ }

    save() {
        this.settings.saveLocal();
    }
}
