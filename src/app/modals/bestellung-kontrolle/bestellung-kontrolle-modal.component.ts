import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, IonicModule } from '@ionic/angular';
import { EuroPreisPipe } from '../../pipes/euro-preis/euro-preis.pipe';
import { NgFor, NgIf } from '@angular/common';

@Component({
    selector: 'ffgbsy-bestellung-kontrolle-modal',
    templateUrl: './bestellung-kontrolle-modal.component.html',
    styleUrls: ['./bestellung-kontrolle-modal.component.scss'],
    standalone: true,
    imports: [
        IonicModule,
        NgFor,
        NgIf,
        EuroPreisPipe,
    ],
})
export class BestellungKontrolleModalComponent implements OnInit {

    bestellung: any;

    constructor(private modalCtrl: ModalController, public navParams: NavParams) {
        this.bestellung = this.navParams.get('bestellung');
    }

    ngOnInit() {
    }

    closeModal() {
        this.modalCtrl.dismiss(false);
    }

    sendBestellung() {
        this.modalCtrl.dismiss(true);
    }

}
