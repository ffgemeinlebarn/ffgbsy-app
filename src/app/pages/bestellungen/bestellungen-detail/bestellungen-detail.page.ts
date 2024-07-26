import { DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, IonBackButton, IonButtons, IonChip, IonContent, IonHeader, IonItem, IonItemDivider, IonLabel, IonList, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Bestellposition } from 'src/app/classes/bestellposition.model';
import { Bestellung } from 'src/app/classes/bestellung.model';
import { Bon } from 'src/app/classes/bon.model';
import { ApiService } from 'src/app/services/api/api.service';
import { BestellungenService } from 'src/app/services/bestellungen/bestellungen.service';
import { FrontendService } from 'src/app/services/frontend/frontend.service';
import { EuroPreisPipe } from '../../../pipes/euro-preis/euro-preis.pipe';

@Component({
    selector: 'ffgbsy-bestellungen-detail',
    templateUrl: './bestellungen-detail.page.html',
    styleUrls: ['./bestellungen-detail.page.scss'],
    standalone: true,
    imports: [
        IonHeader,
        IonToolbar,
        IonButtons,
        IonBackButton,
        IonTitle,
        IonContent,
        IonList,
        IonItem,
        IonLabel,
        IonItemDivider,
        IonChip,
        DatePipe,
        EuroPreisPipe
    ],
})
export class BestellungenDetailPage implements OnInit {

    public activatedRoute = inject(ActivatedRoute);
    private api = inject(ApiService);
    private bestellungenService = inject(BestellungenService);
    private frontend = inject(FrontendService);
    private alertController = inject(AlertController);

    public bestellung: Bestellung;

    ngOnInit() {
        this.loadBestellung(+this.activatedRoute.snapshot.paramMap.get('id'));
    }

    loadBestellung(id: number) {
        this.bestellungenService.read(id).subscribe(bestellung => this.bestellung = bestellung);
    }

    printBon(bon: Bon) {
        this.api.druckBon(bon).subscribe(bonDruck => {

            this.loadBestellung(bon.bestellungen_id);

            if (bonDruck.success) {
                this.frontend.showToast("Bestellbon wurde erfolgreich gedruckt!", 2000);
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
                    placeholder: "Anzahl",
                    name: 'anzahl',
                    type: 'number',
                    value: 1,
                    min: 1,
                    max: bestellposition.anzahl
                }
            ],
            buttons: [
                {
                    text: 'Abbrechen',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => { return true; }
                }, {
                    text: 'Anzahl stornieren',
                    handler: (res) => {
                        let anzahl = parseInt(res.anzahl);

                        this.api.createStornoBestellposition(bestellposition, anzahl).subscribe((stornoposition) => {
                            this.api.createStornoBon(stornoposition).subscribe((bon) => this.api.druckBon(bon).subscribe((druck) => {

                                if (druck.success) {
                                    this.frontend.showToast("Stornobon wurde erfolgreich gedruckt!", 2000);
                                } else {
                                    this.frontend.showOkAlert('Fehler beim Drucken', 'Es konnten der Stornobon nicht gedruckt werden!');
                                }

                                this.loadBestellung(bestellposition.bestellungen_id);
                            }));
                        });

                        return true;
                    }
                }
            ]
        });

        await alert.present();
    }

}
