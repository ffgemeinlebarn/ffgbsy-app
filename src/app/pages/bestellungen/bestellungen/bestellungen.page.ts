import { DatePipe } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonContent, IonFooter, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenuButton, IonRippleEffect, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Bestellung } from 'src/app/classes/bestellung.model';
import { IBestellungenFilter } from 'src/app/interfaces/bestellungen-filter.interface';
import { AppService } from 'src/app/services/app/app.service';
import { AufnehmerService } from 'src/app/services/aufnehmer/aufnehmer.service';
import { BestellungenService } from 'src/app/services/bestellungen/bestellungen.service';
import { TischeService } from 'src/app/services/tische/tische.service';
import { EuroPreisPipe } from '../../../pipes/euro-preis/euro-preis.pipe';

@Component({
    selector: 'ffgbsy-bestellungen',
    templateUrl: './bestellungen.page.html',
    styleUrls: ['./bestellungen.page.scss'],
    standalone: true,
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
        RouterLink
    ]
})
export class BestellungenPage {
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
        return this.bestellungenService
            .search(this.filter.value as IBestellungenFilter)
            .subscribe(bestellungen => this.bestellungen = bestellungen);
    }
}
