import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Bestellposition } from '../../classes/bestellposition.class';
import { BestellungenHandlerService } from 'src/app/services/bestellungen/bestellungen-handler.service';

@Component({
  selector: 'app-bestellungsposition-edit-modal',
  templateUrl: './bestellungsposition-edit-modal.page.html',
  styleUrls: ['./bestellungsposition-edit-modal.page.scss'],
})
export class BestellungspositionEditModalPage implements OnInit {

  public bestellposition: Bestellposition;
  public index: number;

  constructor(private modalCtrl: ModalController, public navParams: NavParams, private bestellungsHandler: BestellungenHandlerService) {
    this.bestellposition = this.navParams.get('bestellposition');
    this.index = this.navParams.get('index');
  }

  ngOnInit() {
  }

  closeModal(){
    this.modalCtrl.dismiss(this.bestellposition);
  }

  changeAnzahl(change: number){
    this.bestellposition.anzahl += change;
  }

  removeBestellposition(){
    this.bestellungsHandler.neubestellung.bestellung.bestellpositionen.splice(this.index, 1);
    this.modalCtrl.dismiss(this.bestellposition);
  }
}