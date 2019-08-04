import { Component, OnInit } from '@angular/core';
import { BestellungenHandlerService } from 'src/app/services/bestellungen/bestellungen-handler.service';
import { SessionService } from 'src/app/services/session/session.service';
import { DataService } from 'src/app/services/data/data.service';
import { AlertController, ModalController } from '@ionic/angular';
import { Tisch } from 'src/app/classes/tisch.class';
import { Produktkategorie } from 'src/app/classes/produktkategorie.class';
import { Produkt } from 'src/app/classes/produkt.class';
import { Bestellposition } from 'src/app/classes/bestellposition.class';
import { BestellungspositionEditModalPage } from 'src/app/modals/bestellungsposition-edit-modal/bestellungsposition-edit-modal.page';
import { BestellungKontrollePage } from 'src/app/modals/bestellung-kontrolle/bestellung-kontrolle.page';

@Component({
  selector: 'app-neue-bestellung',
  templateUrl: './neue-bestellung.page.html',
  styleUrls: ['./neue-bestellung.page.scss'],
})
export class NeueBestellungPage implements OnInit {

  private filterTischkategorieId: number = null;
  private filterProduktkategorie: Produktkategorie = null;

  constructor(
    private data: DataService, 
    private bestellungsHandler: BestellungenHandlerService, 
    private session: SessionService, 
    private alertController: AlertController,
    private modalController: ModalController
  ) {
    this.filterTischkategorieId = this.data.tischkategorien[0].id;
    this.filterProduktkategorie = this.data.produktkategorien[0];
  }

  ngOnInit() { }

  /*******************************************************************************
  *** Tischauswahl
  *******************************************************************************/

  starteTischAuswahl(){
   this.bestellungsHandler.newCurrent();
   this.bestellungsHandler.addAufnehmerToCurrent(this.session.aufnehmer);
   this.bestellungsHandler.addGeraetToCurrent(this.session.geraet);
   this.bestellungsHandler.status = 'current-tischauswahl';
  }

  selectTisch(tisch: Tisch){
    this.bestellungsHandler.addTischToCurrent(tisch); 
    this.bestellungsHandler.status = 'current-bestellpositionen';
  }

  changeFilterTischkategorieId(tischkategorie_id: number){
    this.filterTischkategorieId = tischkategorie_id;
  }


  /*******************************************************************************
  *** Aufnahme der Bestellpositionen
  *******************************************************************************/

  changeFilterProduktkategorie(produktkategorie: Produktkategorie){
    this.filterProduktkategorie = produktkategorie;
  }

  addBestellpositionToCurrentBestellung(produkt: Produkt, form: string, event: any){

      // Verhindert dass ein Extra-Einfügen eine doppeltes Clicken des wrapper-Elements darunter verursacht
      event.stopPropagation();
  
      // hochzählen oder neue Zeile (= neue Bestellposition)
      let added: boolean = false;
  
      if (form == 'standard'){
        for (let bp of this.bestellungsHandler.current.bestellpositionen){
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
        this.bestellungsHandler.current.addBestellposition(new Bestellposition(produkt));
      }
  }

  async editBestellungsposition(bestellposition: Bestellposition){

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
        bestellung: this.bestellungsHandler.current
      },
      cssClass: 'classic-modal',
      showBackdrop: true,
      backdropDismiss: false,
      animated: true
    });

    modal.onDidDismiss()
      .then((data) => {
        if (data.data) {
          this.bestellungsHandler.sendCurrentBestellung();
        }

    });

    return await modal.present();
  }



  /*******************************************************************************
  *** Sonstiges
  *******************************************************************************/

  // Cancel Bestellung

  async askForCancelCurrentBestellung(){

    const alert = await this.alertController.create({
      header: 'Abbruch der Bestellung',
      message: 'Willst du die Bestellung wirklich abbrechen? Alle enthaltenen Positionen werden gelöscht.',
      buttons: [
        {
          text: 'Nein',
          role: 'Nein',
          cssClass: 'secondary',
          handler: (blah) => {
            
          }
        }, {
          text: 'Ja',
          cssClass: 'primary',
          handler: () => {
            this.bestellungsHandler.clearCurrent();
          }
        }
      ]
    });

    await alert.present();
  }

}
