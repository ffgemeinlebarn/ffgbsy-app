import { DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
    AlertController,
    IonBackButton,
    IonButtons,
    IonChip,
    IonContent,
    IonHeader,
    IonItem,
    IonItemDivider,
    IonLabel,
    IonList,
    IonTitle,
    IonToolbar,
} from '@ionic/angular/standalone';
import { BestellungenService } from 'src/app/data/bestellungen.service';
import { BonsService } from 'src/app/data/bons.service';
import { FrontendService } from 'src/app/data/frontend.service';
import { Bestellposition } from 'src/app/model/bestellposition.model';
import { Bestellung } from 'src/app/model/bestellung.model';
import { IBon } from 'src/app/model/i-bon.model';
import { EuroPreisPipe } from '../../../misc/euro-preis.pipe';

@Component({
    selector: 'ffgbsy-bestellungen-detail',
    templateUrl: './bestellungen-detail.page.html',
    styleUrls: ['./bestellungen-detail.page.scss'],
    imports: [IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonList, IonItem, IonLabel, IonItemDivider, IonChip, DatePipe, EuroPreisPipe],
})
export class BestellungenDetailPage implements OnInit {
    public activatedRoute = inject(ActivatedRoute);
    private bonsService = inject(BonsService);
    private bestellungenService = inject(BestellungenService);
    private frontend = inject(FrontendService);
    private alertController = inject(AlertController);

    public bestellung: Bestellung;

    ngOnInit() {
        this.loadBestellung(+this.activatedRoute.snapshot.paramMap.get('id'));
    }

    loadBestellung(id: number) {
        this.bestellungenService.read(id).subscribe((bestellung) => (this.bestellung = bestellung));
    }

    public printBon(bon: IBon) {
        this.bonsService.druckBonById(bon.id).subscribe((bonDruck) => {
            this.loadBestellung(bon.bestellungen_id);

            if (bonDruck.success) {
                this.frontend.showToast('Bestellbon wurde erfolgreich gedruckt!', 2000);
            } else {
                this.frontend.showOkAlert('Fehler beim Drucken', 'Der Bestellbon konnte leider nicht gedruckt werden!');
            }
        });
    }

    async askStornoAnzahl(bestellposition: Bestellposition) {
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
                        this.bestellungenService.createStornoBestellposition(bestellposition, parseInt(res.anzahl)).subscribe((stornoposition) => {
                            this.bonsService.createStornoBon(stornoposition).subscribe((bon) =>
                                this.bonsService.druckBonById(bon.id).subscribe((druck) => {
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
