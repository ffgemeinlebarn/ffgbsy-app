import { Component, inject } from '@angular/core';
import { IonButton, IonContent, IonFooter, IonHeader, IonIcon, IonLabel, IonList, IonTitle, IonToolbar, ModalController } from '@ionic/angular/standalone';
import { AppService } from 'src/app/services/app/app.service';
import { EuroPreisPipe } from '../../pipes/euro-preis/euro-preis.pipe';

@Component({
    selector: 'ffgbsy-bestellung-kontrolle-modal',
    templateUrl: './bestellung-kontrolle-modal.component.html',
    styleUrls: ['./bestellung-kontrolle-modal.component.scss'],
    standalone: true,
    imports: [
        IonHeader,
        EuroPreisPipe,
        IonContent,
        IonList,
        IonToolbar,
        IonHeader,
        IonTitle,
        IonFooter,
        IonButton,
        IonIcon,
        IonLabel
    ],
})
export class BestellungKontrolleModalComponent {
    private modalCtrl = inject(ModalController);
    private app = inject(AppService);

    public bestellung = this.app.bestellung;

    closeModal() {
        this.modalCtrl.dismiss();
    }

    sendBestellung() {
        this.app.sendBestellung();
        this.modalCtrl.dismiss();
    }
}
