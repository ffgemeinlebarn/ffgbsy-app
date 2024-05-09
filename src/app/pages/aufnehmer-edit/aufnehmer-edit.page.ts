import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { BestellungenHandlerService } from 'src/app/services/bestellungen/bestellungen-handler.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'ffgbsy-aufnehmer-edit',
    templateUrl: './aufnehmer-edit.page.html',
    styleUrls: ['./aufnehmer-edit.page.scss'],
    standalone: true,
    imports: [
        IonicModule,
        NgIf,
        FormsModule,
    ],
})
export class AufnehmerEditPage implements OnInit {

    constructor(public bestellungsHandler: BestellungenHandlerService, private api: ApiService) { }
    ngOnInit() { }

    public save() {
        this.api.updateAufnehmer(this.bestellungsHandler.aufnehmer).subscribe();
    }
}
