import { Component, OnInit } from '@angular/core';

import { ModalController, AlertController } from '@ionic/angular';
import { BestellungspositionEditModalPage } from '../../modals/bestellungsposition-edit-modal/bestellungsposition-edit-modal.page';
import { BestellungKontrollePage } from '../../modals/bestellung-kontrolle/bestellung-kontrolle.page';

import { GlobalProviderService } from '../../providers/global-provider/global-provider.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Produkt } from '../../classes/produkt.class';
import { Bestellung } from '../../classes/bestellung.class';
import { Bestellposition } from '../../classes/bestellposition.class';
import { Tisch } from '../../classes/tisch.class';
import { DataProviderService } from '../../providers/data-provider/data-provider.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-neue-bestellung',
  templateUrl: './neue-bestellung.page.html',
  styleUrls: ['./neue-bestellung.page.scss'],
})
export class NeueBestellungPage implements OnInit {

  tisch: Tisch;
  setup_start: boolean = false;
  setup_tische: boolean = false;

  current_tisch_kat_id: number;
  current_tisch_kat_tische: Array<Tisch>;

  current_kat_id: number;
  current_kat_produkte: Array<Produkt>;

  bestellung: Bestellung;

  constructor(public modalController: ModalController, public global: GlobalProviderService, public daten: DataProviderService, public http: HttpClient, public router: Router, public alertController: AlertController) {

    if (this.global.loggedIn.status == false) this.router.navigateByUrl('/home');
  
  }

  ngOnInit() {
  }

  starteTischChooser(){
    this.setup_start = true;

    this.current_tisch_kat_id = this.daten.daten.tischkategorien[0].id;
    this.current_tisch_kat_tische = this.daten.daten.tischkategorien[0].tische;
  }

  createBestellung (tisch: Tisch) {
    this.tisch = tisch;
    this.setup_tische = true;

    this.current_kat_id = this.daten.daten.produktkategorien[0].id;
    this.current_kat_produkte = this.daten.daten.produktkategorien[0].produkte;
    this.bestellung = new Bestellung(this.tisch, this.global.loggedIn.aufnehmer, this.global.loggedIn.geraet);
  }

  async cancelBestellung() {
    const alert = await this.alertController.create({
      header: 'Bestellung Abbrechen',
      message: 'Wollen Sie die Bestellung wirklich abbrechen?',
      buttons: [
        {
          text: 'Nein',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ja',
          cssClass: 'primary',
          handler: () => {
            this.bestellung = null;
            this.tisch = null;
            this.setup_start = false;
            this.setup_tische = false;
          }
        }
      ]
    });

    await alert.present();
  }

  addProdukt(produkt: Produkt, form: string, event: any){

    event.stopPropagation();

    let added: boolean = false;

    if (form == 'standard'){
      for (let bp of this.bestellung.bestellpositionen){
        if (bp.produkt.id == produkt.id){
          bp.anzahl++;
          added = true;
          break;
        }
      } 
    }else if (form == 'new_line'){
      added = false;
    }

    if (!added){
      this.bestellung.bestellpositionen.push(new Bestellposition(produkt));
    }
  }

  // Tisch-Kategorie wechselen

  changeTischKategorie(id: number){

    for(let kat of this.daten.daten.tischkategorien){
      if (kat.id == id){
        this.current_tisch_kat_id = kat.id;
        this.current_tisch_kat_tische = kat.tische;
        break;
      }
    }
  }

  // Kategorie wechselen

  changeKategorie(id: number){

    for(let kat of this.daten.daten.produktkategorien){
      if (kat.id == id){
        this.current_kat_id = kat.id;
        this.current_kat_produkte = kat.produkte;
        break;
      }
    }
  }

  async editBestellungsposition(bestellposition: any){

    const modal = await this.modalController.create({
      component: BestellungspositionEditModalPage,
      componentProps: {
        bestellposition: bestellposition
      },
      cssClass: 'classic-modal',
      showBackdrop: true,
      backdropDismiss: false,
      animated: true
    });

    modal.onDidDismiss()
      .then((data) => {

        //bestellposition = data.data;

        bestellposition.display.eigenschaften.mit = [];
        bestellposition.display.eigenschaften.ohne = [];

        for (let e of data.data.eigenschaften){
          if (e.in_produkt_enthalten == 0 && e.aktiv == 1){
            if (parseFloat(e.preis) != 0){
              bestellposition.display.eigenschaften.mit.push(e.name + " (€ " + e.preis + ")");
            }else{
              bestellposition.display.eigenschaften.mit.push(e.name);
            }
          } else if (e.in_produkt_enthalten == 1 && e.aktiv == 0){
            if (parseFloat(e.preis) != 0){
              bestellposition.display.eigenschaften.ohne.push(e.name + " (€ " + e.preis + ")");
            }else{
              bestellposition.display.eigenschaften.ohne.push(e.name);
            }
          }
        }
    });

    return await modal.present();
  }

  async kontrolliereBestellung(){

    const modal = await this.modalController.create({
      component: BestellungKontrollePage,
      componentProps: {
        bestellung: this.bestellung
      },
      cssClass: 'classic-modal',
      showBackdrop: true,
      backdropDismiss: false,
      animated: true
    });

    modal.onDidDismiss()
      .then((data) => {
        if (data.data){
          this.daten.postBestellung(this.bestellung);

          this.bestellung = null;
          this.tisch = null;
          this.setup_start = false;
          this.setup_tische = false;
        }

    });

    return await modal.present();
  }

}
