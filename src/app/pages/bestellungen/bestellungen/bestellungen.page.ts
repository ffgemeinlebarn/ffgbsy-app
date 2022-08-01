import { Component, OnInit } from '@angular/core';
import { Bestellung } from 'src/app/classes/bestellung.class';
import { BestellungenHandlerService } from 'src/app/services/bestellungen/bestellungen-handler.service';
import { ApiService } from 'src/app/services/api/api.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { QrScanComponent } from 'src/app/modals/qr-scan/qr-scan.component';
import { DataService } from 'src/app/services/data/data.service';
import { HttpParams } from '@angular/common/http';

@Component({
    selector: 'app-bestellungen',
    templateUrl: './bestellungen.page.html',
    styleUrls: ['./bestellungen.page.scss'],
})
export class BestellungenPage implements OnInit {

    public scannerEnabled: boolean = false;
    public bestellungen: Array<Bestellung>;
    public usedFilter: any = {
        aufnehmerId: '*',
        tischId: '*',
        limit: 10
    };

    public availableFilter: any = {
        aufnehmer: [],
        tische: [],
        limits: [5, 10, 25, 50, 100]
    };

    constructor(
        private api: ApiService,
        private bestellungsHandler: BestellungenHandlerService,
        private router: Router,
        private modalCtrl: ModalController,
        private data: DataService
    ) { }

    ngOnInit() {
        this.availableFilter.aufnehmer = this.data.aufnehmer;
        this.availableFilter.tische = this.data.tische;
        this.usedFilter.aufnehmerId = this.bestellungsHandler.aufnehmer?.id ?? '*';
        this.usedFilter.tischId = '*';
    }

    getBestellungen() {
        let params = new HttpParams();

        if (this.usedFilter.aufnehmerId != '*') {
            params = params.append("aufnehmerId", this.usedFilter.aufnehmerId);
        }

        if (this.usedFilter.tischId != '*') {
            params = params.append("tischId", this.usedFilter.tischId);
        }

        params = params.append("limit", this.usedFilter.limit);

        return this.api.getBestellungen(params).subscribe(bestellungen => this.bestellungen = bestellungen);
    }

    async qrScanOpen() {
        this.scannerEnabled = true;

        const modal = await this.modalCtrl.create({
            component: QrScanComponent,
            cssClass: 'qr-modal'
        });

        modal.present();

        const { data, role } = await modal.onWillDismiss();
        const parsedData = JSON.parse(data);

        if (role == 'success' && parsedData.bestellungen_id) {
            this.router.navigate(['bestellungen', parsedData.bestellungen_id]);
        }
    }
}
