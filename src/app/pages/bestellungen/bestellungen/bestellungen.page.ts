import { DatePipe } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
    FormBuilder,
    FormControl,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
    IonContent,
    IonFooter,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonMenuButton,
    IonRippleEffect,
    IonSelect,
    IonSelectOption,
    IonTitle,
    IonToolbar,
    ViewDidEnter,
} from '@ionic/angular/standalone';
import { AppService } from 'src/app/data/app.service';
import { AufnehmerService } from 'src/app/data/aufnehmer.service';
import { BestellungenService } from 'src/app/data/bestellungen.service';
import { TischeService } from 'src/app/data/tische.service';
import { Bestellung } from 'src/app/model/bestellung.model';
import { IBestellungenFilter } from 'src/app/model/bestellungen-filter.interface';
import { EuroPreisPipe } from '../../../misc/euro-preis.pipe';

@Component({
    selector: 'ffgbsy-bestellungen',
    templateUrl: './bestellungen.page.html',
    styleUrls: ['./bestellungen.page.scss'],
    imports: [
        DatePipe,
        EuroPreisPipe,
        FormsModule,
        IonContent,
        IonFooter,
        IonHeader,
        IonIcon,
        IonItem,
        IonLabel,
        IonList,
        IonMenuButton,
        IonRippleEffect,
        IonSelect,
        IonSelectOption,
        IonTitle,
        IonToolbar,
        ReactiveFormsModule,
        RouterLink,
    ],
})
export class BestellungenPage implements ViewDidEnter {
    private bestellungenService = inject(BestellungenService);
    private aufnehmerService = inject(AufnehmerService);
    private tischeService = inject(TischeService);
    private appService = inject(AppService);
    private formBuilder = inject(FormBuilder);

    public scannerEnabled: boolean = false;
    public bestellungen: Array<Bestellung>;

    public filter = this.formBuilder.group({
        aufnehmerId: new FormControl<null | number>(null),
        tischId: new FormControl<null | number>(null),
        limit: [10],
    });

    public availableFilter = {
        aufnehmer: toSignal(this.aufnehmerService.readAll()),
        tische: toSignal(this.tischeService.readAll()),
        limits: [5, 10, 25, 50, 100, 200, 500, 1000],
    };

    constructor() {
        effect(() => {
            this.filter.controls['aufnehmerId'].setValue(
                this.appService.aufnehmer()?.id ?? null
            );
        });
    }

    public searchBestellungen() {
        return this.bestellungenService
            .search(this.filter.value as IBestellungenFilter)
            .subscribe((bestellungen) => (this.bestellungen = bestellungen));
    }
    ionViewDidEnter(): void {
        this.searchBestellungen();
    }
}
