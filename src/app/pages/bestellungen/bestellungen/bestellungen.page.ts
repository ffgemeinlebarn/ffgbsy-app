import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonContent, IonFooter, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenuButton, IonNote, IonRippleEffect, IonSelect, IonSelectOption, IonTitle, IonToolbar, ViewDidEnter } from '@ionic/angular/standalone';
import { BestellungenApiService } from '../../../data/api/bestellungen-api.service';
import { PersonenApiService } from '../../../data/api/personen-api.service';
import { TischeApiService } from '../../../data/api/tische-api.service';
import { AppService } from '../../../data/app.service';
import { EuroPreisPipe } from '../../../misc/euro-preis.pipe';
import { BestellungDto } from '../../../model/dto/bestellung.dto';
import { IBestellungenFilter } from '../../../model/interfaces/i-bestellungen-filter.interface';

@Component({
    selector: 'ffgbsy-bestellungen',
    templateUrl: './bestellungen.page.html',
    styleUrls: ['./bestellungen.page.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [IonNote, DatePipe, EuroPreisPipe, FormsModule, IonContent, IonFooter, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenuButton, IonRippleEffect, IonSelect, IonSelectOption, IonTitle, IonToolbar, ReactiveFormsModule, RouterLink],
})
export class BestellungenPage implements ViewDidEnter {
    private readonly bestellungenApiService = inject(BestellungenApiService);
    private readonly aufnehmerApiService = inject(PersonenApiService);
    private readonly tischeApiService = inject(TischeApiService);
    private readonly appService = inject(AppService);
    private readonly formBuilder = inject(FormBuilder);

    public scannerEnabled: boolean = false;
    public bestellungen = signal<BestellungDto[]>([]);

    public filter = this.formBuilder.group({
        aufnehmerId: new FormControl<null | number>(null),
        tischId: new FormControl<null | number>(null),
        limit: [10],
    });

    public availableFilter = {
        aufnehmer: toSignal(this.aufnehmerApiService.readAll()),
        tische: toSignal(this.tischeApiService.readAll()),
        limits: [5, 10, 25, 50, 100, 200, 500, 1000],
    };

    constructor() {
        effect(() => {
            this.filter.controls['aufnehmerId'].setValue(this.appService.aufnehmer()?.id ?? null);
        });
    }

    public searchBestellungen() {
        return this.bestellungenApiService.search(this.filter.value as IBestellungenFilter).subscribe((bestellungen) => {
            this.bestellungen.set(bestellungen);
        });
    }

    ionViewDidEnter(): void {
        this.searchBestellungen();
    }
}
