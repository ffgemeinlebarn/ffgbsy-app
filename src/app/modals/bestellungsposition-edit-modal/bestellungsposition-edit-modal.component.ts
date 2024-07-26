import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { IonButton, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonRow, IonTitle, IonToolbar } from "@ionic/angular/standalone";
import { BestellungenHandlerService } from 'src/app/services/bestellungen/bestellungen-handler.service';
import { Bestellposition } from '../../classes/bestellposition.model';
import { EuroPreisPipe } from '../../pipes/euro-preis/euro-preis.pipe';

@Component({
    selector: 'ffgbsy-bestellungsposition-edit-modal',
    templateUrl: './bestellungsposition-edit-modal.component.html',
    styleUrls: ['./bestellungsposition-edit-modal.component.scss'],
    standalone: true,
    imports: [IonFooter, IonItem, IonLabel, IonList, IonListHeader, IonIcon, IonButton, IonGrid, IonRow, IonContent, IonTitle, IonToolbar, IonCol, IonHeader,
        FormsModule,
        EuroPreisPipe
    ],
})
export class BestellungspositionEditModalComponent implements OnInit {

    private modalCtrl = inject(ModalController);
    public navParams = inject(NavParams);
    private bestellungsHandler = inject(BestellungenHandlerService);

    public bestellposition: Bestellposition;
    public index: number;

    ngOnInit() {
        this.bestellposition = this.navParams.get('bestellposition');
        this.index = this.navParams.get('index');
    }

    closeModal() {
        this.modalCtrl.dismiss(this.bestellposition);
    }

    changeAnzahl(change: number) {
        this.bestellposition.anzahl += change;
    }

    removeBestellposition() {
        // this.bestellungsHandler.neubestellung.bestellung.bestellpositionen.splice(this.index, 1);
        this.modalCtrl.dismiss(this.bestellposition);
    }
}
