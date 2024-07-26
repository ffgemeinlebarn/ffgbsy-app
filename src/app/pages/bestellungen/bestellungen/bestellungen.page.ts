import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonContent, IonFooter, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenuButton, IonRippleEffect, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Bestellung } from 'src/app/classes/bestellung.model';
import { ApiService } from 'src/app/services/api/api.service';
import { AppService } from 'src/app/services/app/app.service';
import { AufnehmerService } from 'src/app/services/aufnehmer/aufnehmer.service';
import { TischeService } from 'src/app/services/tische/tische.service';
import { EuroPreisPipe } from '../../../pipes/euro-preis/euro-preis.pipe';

@Component({
    selector: 'ffgbsy-bestellungen',
    templateUrl: './bestellungen.page.html',
    styleUrls: ['./bestellungen.page.scss'],
    standalone: true,
    imports: [IonRippleEffect, IonLabel, IonItem, IonIcon, IonList, IonFooter, IonContent, IonTitle, IonToolbar, IonHeader, IonMenuButton,
        IonSelect,
        IonSelectOption,
        RouterLink,
        FormsModule,
        DatePipe,
        EuroPreisPipe,
        ReactiveFormsModule
    ],
})
export class BestellungenPage {
    private api = inject(ApiService);
    private aufnehmerService = inject(AufnehmerService);
    private tischeService = inject(TischeService);
    private appService = inject(AppService);
    private formBuilder = inject(FormBuilder);

    public scannerEnabled: boolean = false;
    public bestellungen: Array<Bestellung>;

    public filter = this.formBuilder.group({
        aufnehmerId: [null],
        tischId: [null],
        limit: [10]
    });

    public availableFilter = {
        aufnehmer: toSignal(this.aufnehmerService.readAll()),
        tische: toSignal(this.tischeService.readAll()),
        limits: [5, 10, 25, 50, 100, 200, 500, 1000]
    };

    constructor() {
        effect(() => {
            this.filter.controls['aufnehmerId'].setValue(this.appService.aufnehmer()?.id ?? null);
        });
    }

    public searchBestellungen() {
        let params = new HttpParams();

        if (this.filter.controls['aufnehmerId'].value) {
            params = params.append("aufnehmerId", this.filter.controls['aufnehmerId'].value);
        }
        if (this.filter.controls['tischId'].value) {
            params = params.append("tischId", this.filter.controls['tischId'].value);
        }

        params = params.append("limit", this.filter.controls['limit'].value);

        return this.api.searchBestellungen(params).subscribe(bestellungen => this.bestellungen = bestellungen);
    }
}
