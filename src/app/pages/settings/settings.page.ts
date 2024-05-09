import { Component, OnInit, inject } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { BestellungenHandlerService } from 'src/app/services/bestellungen/bestellungen-handler.service';
import { FrontendService } from 'src/app/services/frontend/frontend.service';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'ffgbsy-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
    standalone: true,
    imports: [IonicModule, FormsModule],
})
export class SettingsPage {

    bestellungsHandler = inject(BestellungenHandlerService);
    data = inject(DataService);
    settings = inject(SettingsService);
    bestellungen = inject(BestellungenHandlerService);
    frontend = inject(FrontendService);

    save() {
        this.settings.saveLocal();
    }
}
