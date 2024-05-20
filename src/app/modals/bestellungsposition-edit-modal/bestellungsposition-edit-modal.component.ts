import { Component, OnInit, Input, inject } from '@angular/core';
import { ModalController, NavParams, IonicModule } from '@ionic/angular';
import { Bestellposition } from '../../classes/bestellposition.class';
import { BestellungenHandlerService } from 'src/app/services/bestellungen/bestellungen-handler.service';
import { EuroPreisPipe } from '../../pipes/euro-preis/euro-preis.pipe';
import { FormsModule } from '@angular/forms';


@Component({
    selector: 'ffgbsy-bestellungsposition-edit-modal',
    templateUrl: './bestellungsposition-edit-modal.component.html',
    styleUrls: ['./bestellungsposition-edit-modal.component.scss'],
    standalone: true,
    imports: [
    IonicModule,
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
        this.bestellungsHandler.neubestellung.bestellung.bestellpositionen.splice(this.index, 1);
        this.modalCtrl.dismiss(this.bestellposition);
    }
}
