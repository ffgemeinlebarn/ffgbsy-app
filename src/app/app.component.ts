import { Component } from '@angular/core';
import { SettingsService } from './services/settings/settings.service';
import { BestellungenHandlerService } from './services/bestellungen/bestellungen-handler.service';
import { FrontendService } from './services/frontend/frontend.service';
import { DataService } from './services/data/data.service';
import { environment } from 'src/environments/environment';
import { NotificationService } from './services/notification/notification.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {

    public isAdmin: boolean = false;

    constructor(
        public bestellungsHandler: BestellungenHandlerService,
        public data: DataService,
        public settings: SettingsService,
        public frontend: FrontendService,
        public notification: NotificationService
    ) {
        this.settings.ready.then(() => {
            this.isAdmin = environment.localAdminPin == this.settings.locale.adminPin;
        })
    }
}
