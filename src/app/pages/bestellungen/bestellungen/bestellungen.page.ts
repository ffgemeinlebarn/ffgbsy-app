import { Component, OnInit } from '@angular/core';
import { Bestellung } from 'src/app/classes/bestellung.class';
import { BestellungenHandlerService } from 'src/app/services/bestellungen/bestellungen-handler.service';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
    selector: 'app-bestellungen',
    templateUrl: './bestellungen.page.html',
    styleUrls: ['./bestellungen.page.scss'],
})
export class BestellungenPage implements OnInit {

    public bestellungen: Array<Bestellung>;
    public filter: any = {
        aufnehmerId: null,
        tischeId: null
    };

    constructor(
        private api: ApiService,
        private bestellungsHandler: BestellungenHandlerService
    ) {
        this.filter.aufnehmerId = this.bestellungsHandler.aufnehmer;
        this.filter.tischeId = null;
    }

    ngOnInit() {
        this.getBestellungen();
    }

    getBestellungen() {
        return this.api.getBestellungen().subscribe(bestellungen => this.bestellungen = bestellungen);
    }

    openQrScanner() {
        // TODO: Implement QR Scanner
    }
}
