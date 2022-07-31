import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bestellung } from 'src/app/classes/bestellung.class';
import { Bestellposition } from 'src/app/classes/bestellposition.class';
import { ApiService } from 'src/app/services/api/api.service';
import { AlertController } from '@ionic/angular';
import { FrontendService } from 'src/app/services/frontend/frontend.service';

@Component({
    selector: 'app-bestellungen-detail',
    templateUrl: './bestellungen-detail.page.html',
    styleUrls: ['./bestellungen-detail.page.scss'],
})
export class BestellungenDetailPage implements OnInit {

    public bestellung: Bestellung;

    constructor(
        private activatedRoute: ActivatedRoute,
        private api: ApiService,
        private frontend: FrontendService,
        private alertController: AlertController) { }

    ngOnInit() {
        this.loadBestellung(+this.activatedRoute.snapshot.paramMap.get('id'));
    }

    loadBestellung(id: number) {
        this.api.getBestellung(id).subscribe(bestellung => this.bestellung = bestellung);
    }

    printBon(bestellungenId: number, druckerId: number) {
        this.api.druckBon(bestellungenId, druckerId).subscribe(bon => {

            this.loadBestellung(bestellungenId);

            if (bon.result) {
                this.frontend.showToast("Bon wurde erfolgreich gedruckt!", 2000);
            } else {
                this.frontend.showOkAlert('Fehler beim Drucken', 'Der Bon konnte leider nicht gedruckt werden!');
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
                    max: bestellposition.anzahl - bestellposition.anzahl_storno
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

                        if ((anzahl > 0) && (anzahl <= (bestellposition.anzahl - bestellposition.anzahl_storno))) {

                            this.api.stornoBestellposition(bestellposition, anzahl).subscribe((bon) => {
                                this.loadBestellung(bestellposition.bestellungen_id);

                                if (bon.result) {
                                    this.frontend.showToast("Storno-Bon wurde erfolgreich gedruckt!", 2000);
                                } else {
                                    this.frontend.showOkAlert('Fehler beim Drucken', 'Es konnten der Storno-Bon nicht gedruckt werden!');
                                }
                            });
                            return true;
                        }
                        return false;
                    }
                }
            ]
        });

        await alert.present();
    }

}
