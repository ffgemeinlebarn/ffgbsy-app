import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { BestellungenHandlerService } from 'src/app/services/bestellungen/bestellungen-handler.service';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'ffgbsy-aufnehmer-edit',
    templateUrl: './aufnehmer-edit.page.html',
    styleUrls: ['./aufnehmer-edit.page.scss'],
    standalone: true,
    imports: [
    IonicModule,
    FormsModule
],
})
export class AufnehmerEditPage {

    public bestellungsHandler = inject(BestellungenHandlerService);
    private api = inject(ApiService);

    public save() {
        this.api.updateAufnehmer(this.bestellungsHandler.aufnehmer).subscribe();
    }
}
