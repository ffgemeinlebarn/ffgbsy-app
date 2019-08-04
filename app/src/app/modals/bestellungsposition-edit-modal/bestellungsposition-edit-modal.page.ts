import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Bestellposition } from '../../classes/bestellposition.class';

@Component({
  selector: 'app-bestellungsposition-edit-modal',
  templateUrl: './bestellungsposition-edit-modal.page.html',
  styleUrls: ['./bestellungsposition-edit-modal.page.scss'],
})
export class BestellungspositionEditModalPage implements OnInit {

  bestellpositionModal: Bestellposition;

  constructor(private modalCtrl: ModalController, public navParams: NavParams) {
    this.bestellpositionModal = this.navParams.get('bestellposition');
  }

  ngOnInit() {
  }

  closeModal(){
    this.modalCtrl.dismiss(this.bestellpositionModal);
  }

  changeAnzahl(change: number){
    this.bestellpositionModal.anzahl += change;
  }
}