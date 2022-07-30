// Angular
import { Component } from '@angular/core';

// Ionic
import { Platform } from '@ionic/angular';

// Meine Services
import { SettingsService } from './services/settings/settings.service';
import { BestellungenHandlerService } from './services/bestellungen/bestellungen-handler.service';
import { FrontendService } from './services/frontend/frontend.service';
import { DataService } from './services/data/data.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    constructor(
        private platform: Platform,
        public bestellungsHandler: BestellungenHandlerService,
        public data: DataService,
        public settings: SettingsService,
        public frontend: FrontendService
    ) { }
}
