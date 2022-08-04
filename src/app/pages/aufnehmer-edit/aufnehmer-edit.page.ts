import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { BestellungenHandlerService } from 'src/app/services/bestellungen/bestellungen-handler.service';

@Component({
    selector: 'app-aufnehmer-edit',
    templateUrl: './aufnehmer-edit.page.html',
    styleUrls: ['./aufnehmer-edit.page.scss'],
})
export class AufnehmerEditPage implements OnInit {

    constructor(public bestellungsHandler: BestellungenHandlerService, private api: ApiService) { }
    ngOnInit() { }

    public save() {
        this.api.updateAufnehmer(this.bestellungsHandler.aufnehmer).subscribe();
    }
}
