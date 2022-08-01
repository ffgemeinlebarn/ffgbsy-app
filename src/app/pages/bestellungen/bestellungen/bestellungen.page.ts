import { Component, OnInit } from '@angular/core';
import { Bestellung } from 'src/app/classes/bestellung.class';
import { BestellungenHandlerService } from 'src/app/services/bestellungen/bestellungen-handler.service';
import { ApiService } from 'src/app/services/api/api.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { QrScanComponent } from 'src/app/modals/qr-scan/qr-scan.component';

@Component({
    selector: 'app-bestellungen',
    templateUrl: './bestellungen.page.html',
    styleUrls: ['./bestellungen.page.scss'],
})
export class BestellungenPage implements OnInit {

    public scannerEnabled: boolean = false;
    public bestellungen: Array<Bestellung>;
    public filter: any = {
        aufnehmerId: null,
        tischeId: null
    };

    constructor(
        private api: ApiService,
        private bestellungsHandler: BestellungenHandlerService,
        private router: Router,
        private modalCtrl: ModalController
    ) {
        this.filter.aufnehmerId = this.bestellungsHandler.aufnehmer;
        this.filter.tischeId = null;
    }

    ngOnInit() {
        this.getBestellungen();
    }

    getBestellungen(tischId = null, aufnehmerId = null, limit = 25) {
        return this.api.getBestellungen().subscribe(bestellungen => this.bestellungen = bestellungen);
    }

    async qrScanOpen() {
        this.scannerEnabled = true;

        const modal = await this.modalCtrl.create({
            component: QrScanComponent,
            cssClass: 'qr-modal'
        });

        modal.present();

        const { data, role } = await modal.onWillDismiss();

        if (role == 'success') {
            this.router.navigate(['bestellungen', data]);
        }
    }
}
