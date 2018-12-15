import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-bestellung-kontrolle',
  templateUrl: './bestellung-kontrolle.page.html',
  styleUrls: ['./bestellung-kontrolle.page.scss'],
})
export class BestellungKontrollePage implements OnInit {

  bestellung: any;

  constructor(private modalCtrl: ModalController, public navParams: NavParams) {
    this.bestellung = this.navParams.get('bestellung');
  }

  ngOnInit() {
  }

  closeModal(){
    this.modalCtrl.dismiss(false);
  }

  sendBestellung(){
    this.modalCtrl.dismiss(true);
  }

}
