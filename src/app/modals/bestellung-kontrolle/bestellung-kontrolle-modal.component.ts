import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
    selector: 'ffgbsy-bestellung-kontrolle-modal',
    templateUrl: './bestellung-kontrolle-modal.component.html',
    styleUrls: ['./bestellung-kontrolle-modal.component.scss'],
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
