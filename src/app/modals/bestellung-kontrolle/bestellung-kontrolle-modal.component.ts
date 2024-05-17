import { Component, OnInit, inject } from '@angular/core';
import { ModalController, NavParams, IonicModule } from '@ionic/angular';
import { EuroPreisPipe } from '../../pipes/euro-preis/euro-preis.pipe';


@Component({
    selector: 'ffgbsy-bestellung-kontrolle-modal',
    templateUrl: './bestellung-kontrolle-modal.component.html',
    styleUrls: ['./bestellung-kontrolle-modal.component.scss'],
    standalone: true,
    imports: [
    IonicModule,
    EuroPreisPipe
],
})
export class BestellungKontrolleModalComponent implements OnInit {

    private modalCtrl = inject(ModalController);
    public navParams = inject(NavParams);

    bestellung: any;

    ngOnInit() {
        this.bestellung = this.navParams.get('bestellung');
    }

    closeModal() {
        this.modalCtrl.dismiss(false);
    }

    sendBestellung() {
        this.modalCtrl.dismiss(true);
    }

}
