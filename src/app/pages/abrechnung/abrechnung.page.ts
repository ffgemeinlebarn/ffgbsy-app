import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { form, FormField } from '@angular/forms/signals';
import { RouterModule } from '@angular/router';
import { IonBadge, IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenuButton, IonProgressBar, IonTitle, IonToggle, IonToolbar, ModalController, ViewDidEnter } from '@ionic/angular/standalone';
import { from, map, mergeMap } from 'rxjs';
import { AbrechnungenApiService } from '../../data/api/abrechnungen-api.service';
import { BonsApiService } from '../../data/api/bons-api.service';
import { PersonenApiService } from '../../data/api/personen-api.service';
import { AppService } from '../../data/app.service';
import { DataService } from '../../data/data.service';
import { SelectAufnehmerModalComponent } from '../../feature/select-aufnehmer-modal/select-aufnehmer-modal.component';
import { EuroPreisPipe } from '../../misc/euro-preis.pipe';
import { Abrechnung } from '../../model/business/abrechnung.model';
import { AbrechnungOverviewItemDto } from '../../model/dto/abrechnung-overview-item.dto';
import { BonDto } from '../../model/dto/bon.dto';
import { PersonDto } from '../../model/dto/person.dto';
import { TileComponent } from '../../ui/tile/tile.component';

@Component({
    selector: 'ffgbsy-abrechnung',
    templateUrl: './abrechnung.page.html',
    styleUrls: ['./abrechnung.page.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [IonProgressBar, IonToggle, IonIcon, TileComponent, RouterModule, IonButton, IonButtons, IonButton, IonFooter, IonBadge, IonLabel, IonItem, IonList, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, EuroPreisPipe, FormsModule, FormField],
})
export class AbrechnungPage implements ViewDidEnter {
    private readonly appService = inject(AppService);
    private readonly data = inject(DataService);
    private readonly modalController = inject(ModalController);
    private readonly bonsApiService = inject(BonsApiService);
    private readonly personenApiService = inject(PersonenApiService);
    private readonly abrechnungenApiService = inject(AbrechnungenApiService);

    public readonly personen = this.data.personen;
    public readonly abrechnung = this.appService.abrechnung;
    public readonly abrechnungKostenstelle = this.appService.abrechnungKostenstelle;

    public readonly overviews = signal<AbrechnungOverviewItemDto[]>(null);
    private barcodeInputBuffer: string = '';
    public readonly barcodeInputActive = signal(true);
    public readonly barcodeInputActiveForm = form(this.barcodeInputActive);
    public readonly lastBookedKellner = signal<PersonDto>(null);
    public readonly lastBookedSumme = signal<number>(null);

    private readonly bonInputStartSequence = 'bon';
    private readonly kellnerInputStartSequence = 'kellner';

    constructor() {
        console.log('[FFGBSY]', 'Add Event Listener for Keydown');
        document.addEventListener('keydown', (event) => {
            if (this.barcodeInputActive()) {
                const key = event.key.toLowerCase();

                // Number or Start Sequence Input
                if (this.isValidBufferInput(key)) {
                    this.barcodeInputBuffer += key;

                    console.log('[FFGBSY]', `Valid Input '${key}', Input =`, this.barcodeInputBuffer);
                }

                // Enter & Buffer filled
                else if (key === 'enter' && this.barcodeInputBuffer.length > 0) {
                    console.log('[FFGBSY]', 'Input End with Enter, Input =', this.barcodeInputBuffer);

                    if (this.abrechnung() && this.abrechnung().kellner) {
                        if (this.barcodeInputBuffer.startsWith(this.bonInputStartSequence)) {
                            const bonId = Number(this.barcodeInputBuffer.replace(this.bonInputStartSequence, '')) as BonId;
                            this.addBonById(bonId);
                        }
                    }
                    if (this.barcodeInputBuffer.startsWith(this.kellnerInputStartSequence)) {
                        const kellnerId = Number(this.barcodeInputBuffer.replace(this.kellnerInputStartSequence, '')) as PersonId;
                        this.personenApiService.read(kellnerId).subscribe((person) => this.abrechnung.set(new Abrechnung(this.abrechnungKostenstelle(), person)));

                        this.barcodeInputBuffer = '';
                    }

                    // Reset Buffer on no Digit or Enter
                    else {
                        this.barcodeInputBuffer = '';
                    }
                }
            }
        });
    }

    private isValidBufferInput(value: string): boolean {
        return this.bonInputStartSequence.toLowerCase().indexOf(value) >= 0 /* Bon Start String */ || this.kellnerInputStartSequence.toLowerCase().indexOf(value) >= 0 /* Kellner Start String */ || /^\d+$/.test(value); /* Nummer */
    }

    public cancel() {
        this.abrechnung.set(null);
    }

    public addBonById(id: BonId) {
        if (
            !this.abrechnung()
                .bons()
                .find((b) => b.id == id)
        ) {
            this.bonsApiService.read(id).subscribe((bon) => this.addBon(bon));
        }
    }

    public addBon(bon: BonDto) {
        this.abrechnung.update((a) => {
            a.bons.update((b) => [...b, bon]);

            return a;
        });
    }

    public selectKellner() {
        from(
            this.modalController.create({
                component: SelectAufnehmerModalComponent,
                componentProps: {
                    showAufnehmer: false,
                    showKellner: true,
                },
                canDismiss: true,
                breakpoints: [0.1, 0.5, 1],
                initialBreakpoint: 1,
            }),
        )
            .pipe(
                mergeMap((modal) => from(modal.present()).pipe(map(() => modal))),
                mergeMap((modal) => from(modal.onDidDismiss())),
            )
            .subscribe((result: { data: PersonDto; role: 'select' | 'cancel' }) => {
                if (result.role == 'select' && result.data) {
                    if (this.abrechnung()) {
                        this.abrechnung.update((a) => {
                            a.kellner = result.data;
                            return a;
                        });
                    } else {
                        this.abrechnung.set(new Abrechnung(this.abrechnungKostenstelle(), result.data));
                    }
                }
            });
    }

    private loadOverview() {
        this.abrechnungenApiService.readOverviews().subscribe((ovs) => this.overviews.set(ovs));
    }

    public createAbrechnung() {
        this.abrechnungenApiService.createAbrechnung(this.abrechnung().asDto()).subscribe(() => {
            this.lastBookedKellner.set(this.abrechnung().kellner);
            this.lastBookedSumme.set(this.abrechnung().summe());
            this.abrechnung.set(null);
            this.loadOverview();
        });
    }

    ionViewDidEnter(): void {
        this.loadOverview();
    }
}
