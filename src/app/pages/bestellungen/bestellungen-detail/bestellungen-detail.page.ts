import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bestellung } from 'src/app/classes/bestellung.class';
import { Bestellposition } from 'src/app/classes/bestellposition.class';
import { ApiService } from 'src/app/services/api/api.service';
import { AlertController } from '@ionic/angular';
import { FrontendService } from 'src/app/services/frontend/frontend.service';
import { Bestellbon } from 'src/app/classes/bestellbon';
import { Stornobon } from 'src/app/classes/stornobon';

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

    printBestellbon(bestellbon: Bestellbon) {
        this.api.druckBestellbon(bestellbon).subscribe(bestellbonDruck => {

            this.loadBestellung(bestellbon.bestellungen_id);

            if (bestellbonDruck.success) {
                this.frontend.showToast("Bestellbon wurde erfolgreich gedruckt!", 2000);
            } else {
                this.frontend.showOkAlert('Fehler beim Drucken', 'Der Bestellbon konnte leider nicht gedruckt werden!');
            }
        });
    }

    printStornobon(stornobon: Stornobon) {
        this.api.druckStornobon(stornobon).subscribe(stornobonDruck => {

            this.loadBestellung(stornobon.bestellungen_id);

            if (stornobonDruck.success) {
                this.frontend.showToast("Stornobon wurde erfolgreich gedruckt!", 2000);
            } else {
                this.frontend.showOkAlert('Fehler beim Drucken', 'Der Stornobon konnte leider nicht gedruckt werden!');
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
                    max: 100
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

                        this.api.createStornobon(bestellposition, anzahl).subscribe((stornobon) => this.api.druckStornobon(stornobon).subscribe((druck) => {
                            this.loadBestellung(bestellposition.bestellungen_id);

                            if (druck.success) {
                                this.frontend.showToast("Stornobon wurde erfolgreich gedruckt!", 2000);
                            } else {
                                this.frontend.showOkAlert('Fehler beim Drucken', 'Es konnten der Stornobon nicht gedruckt werden!');
                            }
                        }));

                        return true;
                    }
                }
            ]
        });

        await alert.present();
    }

}
