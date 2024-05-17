import { Component, OnInit, inject, signal } from '@angular/core';
import { Bestellung } from 'src/app/classes/bestellung.class';
import { BestellungenHandlerService } from 'src/app/services/bestellungen/bestellungen-handler.service';
import { ApiService } from 'src/app/services/api/api.service';
import { Router, RouterLink } from '@angular/router';
import { ModalController, IonicModule } from '@ionic/angular';
import { DataService } from 'src/app/services/data/data.service';
import { HttpParams } from '@angular/common/http';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { EuroPreisPipe } from '../../../pipes/euro-preis/euro-preis.pipe';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Aufnehmer } from 'src/app/classes/aufnehmer.class';

@Component({
    selector: 'ffgbsy-bestellungen',
    templateUrl: './bestellungen.page.html',
    styleUrls: ['./bestellungen.page.scss'],
    standalone: true,
    imports: [
    IonicModule,
    RouterLink,
    FormsModule,
    DatePipe,
    EuroPreisPipe
],
})
export class BestellungenPage implements OnInit {

    private api = inject(ApiService);
    private bestellungsHandler = inject(BestellungenHandlerService);
    private router = inject(Router);
    private modalCtrl = inject(ModalController);
    private data = inject(DataService);
    public notification = inject(NotificationService);

    public scannerEnabled: boolean = false;
    public bestellungen: Array<Bestellung>;
    public usedFilter: any = {
        aufnehmerId: '*',
        tischId: '*',
        limit: 10
    };

    public availableFilter: any = {
        aufnehmer: signal<Aufnehmer[]>([]),
        tische: [],
        limits: [5, 10, 25, 50, 100]
    };

    ngOnInit() {
        this.availableFilter.aufnehmer = this.data.aufnehmer;
        this.availableFilter.tische = this.data.tische;
        this.usedFilter.aufnehmerId = this.bestellungsHandler.aufnehmer?.id ?? '*';
        this.usedFilter.tischId = '*';
    }

    public searchBestellungen() {
        let params = new HttpParams();

        if (this.usedFilter.aufnehmerId != '*') {
            params = params.append("aufnehmerId", this.usedFilter.aufnehmerId);
        }

        if (this.usedFilter.tischId != '*') {
            params = params.append("tischId", this.usedFilter.tischId);
        }

        params = params.append("limit", this.usedFilter.limit);

        return this.api.searchBestellungen(params).subscribe(bestellungen => this.bestellungen = bestellungen);
    }
}
