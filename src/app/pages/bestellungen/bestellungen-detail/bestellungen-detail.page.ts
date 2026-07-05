import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, IonBackButton, IonButton, IonButtons, IonChip, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonItemDivider, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonNote, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { BestellungenApiService } from '../../../data/api/bestellungen-api.service';
import { BonsApiService } from '../../../data/api/bons-api.service';
import { FrontendService } from '../../../data/frontend.service';
import { EuroPreisPipe } from '../../../misc/euro-preis.pipe';
import { BestellpositionDto } from '../../../model/dto/bestellposition.dto';
import { BestellungDto } from '../../../model/dto/bestellung.dto';
import { BonDto } from '../../../model/dto/bon.dto';

@Component({
    selector: 'ffgbsy-bestellungen-detail',
    templateUrl: './bestellungen-detail.page.html',
    styleUrls: ['./bestellungen-detail.page.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [IonText, IonButton, IonIcon, IonItemOptions, IonItemOption, IonNote, IonGrid, IonItemSliding, IonRow, IonCol, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonList, IonItem, IonLabel, IonItemDivider, IonChip, DatePipe, EuroPreisPipe],
})
export class BestellungenDetailPage implements OnInit {
    private readonly activatedRoute = inject(ActivatedRoute);
    private readonly bonsApiService = inject(BonsApiService);
    private readonly bestellungenApiService = inject(BestellungenApiService);
    private readonly frontend = inject(FrontendService);
    private readonly alertController = inject(AlertController);

    public bestellung = signal<BestellungDto>(null);

    ngOnInit() {
        this.loadBestellung(+this.activatedRoute.snapshot.paramMap.get('id') as BestellungId);
    }

    loadBestellung(id: BestellungId) {
        this.bestellungenApiService.read(id).subscribe((bestellung) => {
            this.bestellung.set(bestellung);
        });
    }

    public printBon(bon: BonDto) {
        this.bonsApiService.druckBonById(bon.id).subscribe((bonDruck) => {
            this.loadBestellung(bon.bestellungen_id);

            if (bonDruck.success) {
                this.frontend.showToast('Bestellbon wurde erfolgreich gedruckt!', 2000);
            } else {
                this.frontend.showOkAlert('Fehler beim Drucken', 'Der Bestellbon konnte leider nicht gedruckt werden!');
            }
        });
    }

    async askStornoAnzahl(bestellposition: BestellpositionDto) {
        const alert = await this.alertController.create({
            header: 'Bestellposition stornieren',
            inputs: [
                {
                    placeholder: 'Anzahl',
                    name: 'anzahl',
                    type: 'number',
                    value: 1,
                    min: 1,
                    max: bestellposition.anzahl,
                },
            ],
            buttons: [
                {
                    text: 'Abbrechen',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        return true;
                    },
                },
                {
                    text: 'Anzahl stornieren',
                    handler: (res) => {
                        this.bestellungenApiService.createStornoBestellposition(bestellposition, parseInt(res.anzahl)).subscribe((stornoposition) => {
                            this.bonsApiService.createStornoBon(stornoposition).subscribe((bon) =>
                                this.bonsApiService.druckBonById(bon.id).subscribe((druck) => {
                                    if (druck.success) {
                                        this.frontend.showToast('Stornobon wurde erfolgreich gedruckt!', 2000);
                                    } else {
                                        this.frontend.showOkAlert('Fehler beim Drucken', 'Es konnten der Stornobon nicht gedruckt werden!');
                                    }

                                    this.loadBestellung(bestellposition.bestellungen_id);
                                }),
                            );
                        });

                        return true;
                    },
                },
            ],
        });

        await alert.present();
    }
}
