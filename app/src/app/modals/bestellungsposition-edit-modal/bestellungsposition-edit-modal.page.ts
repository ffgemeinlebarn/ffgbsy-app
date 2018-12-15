import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-bestellungsposition-edit-modal',
  templateUrl: './bestellungsposition-edit-modal.page.html',
  styleUrls: ['./bestellungsposition-edit-modal.page.scss'],
})
export class BestellungspositionEditModalPage implements OnInit {

  bestellposition: any;

  constructor(private modalCtrl: ModalController, public navParams: NavParams) {
    this.bestellposition = this.navParams.get('bestellposition');
  }

  ngOnInit() {
  }

  closeModal(){
    this.modalCtrl.dismiss(this.bestellposition);
  }

  changeAnzahl(change: number){
    this.bestellposition.anzahl += change;
  }
}