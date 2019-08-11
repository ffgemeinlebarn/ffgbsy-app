import { Component, OnInit } from '@angular/core';
import { BestellungenHandlerService } from 'src/app/services/bestellungen/bestellungen-handler.service';
import { SessionService } from 'src/app/services/session/session.service';
import { DataService } from 'src/app/services/data/data.service';
import { ModalController } from '@ionic/angular';
import { Tisch } from 'src/app/classes/tisch.class';
import { Produktkategorie } from 'src/app/classes/produktkategorie.class';
import { Produkt } from 'src/app/classes/produkt.class';
import { Bestellposition } from 'src/app/classes/bestellposition.class';
import { BestellungspositionEditModalPage } from 'src/app/modals/bestellungsposition-edit-modal/bestellungsposition-edit-modal.page';
import { BestellungKontrollePage } from 'src/app/modals/bestellung-kontrolle/bestellung-kontrolle.page';
import { FrontendService } from 'src/app/services/frontend/frontend.service';
import { SettingsService } from 'src/app/services/settings/settings.service';

@Component({
  selector: 'app-neue-bestellung',
  templateUrl: './neue-bestellung.page.html',
  styleUrls: ['./neue-bestellung.page.scss'],
})
export class NeueBestellungPage implements OnInit {

  public filterTischkategorieId: number = null;
  public filterProduktkategorie: Produktkategorie = null;

  constructor(
    public bestellungsHandler: BestellungenHandlerService,
    public data: DataService,
    public session: SessionService,
    public settings: SettingsService,
    public frontend: FrontendService,
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
   this.bestellungsHandler.newNeubestellung();
   this.bestellungsHandler.addAufnehmerToNeubestellung(this.session.aufnehmer);
   this.bestellungsHandler.addGeraetToNeubestellung(this.session.geraet);
   this.bestellungsHandler.neubestellung.status = 'tischauswahl';
  }

  selectTisch(tisch: Tisch){
    this.bestellungsHandler.addTischToNeubestellung(tisch); 
    this.bestellungsHandler.neubestellung.status = 'bestellpositionen';
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

  addBestellposition(produkt: Produkt, form: string, event: any){

      // Verhindert dass ein Extra-Einfügen eine doppeltes Clicken des wrapper-Elements darunter verursacht
      event.stopPropagation();
  
      // hochzählen oder neue Zeile (= neue Bestellposition)
      let added: boolean = false;
  
      if (form == 'standard'){

        added = false;

        for (let bp of this.bestellungsHandler.neubestellung.bestellung.bestellpositionen){
          if (
            bp.produkt.id == produkt.id &&
            bp.display.eigenschaften.mit.length == 0 &&  // <= nur unmodifiziertes Produkt automatisch hochzählen
            bp.display.eigenschaften.ohne.length == 0
          ){
            bp.anzahl++;
            added = true;
            break;
          }
        } 
      }else if (form == 'new_line'){
        added = false;
      }
  
      if (!added){
        this.bestellungsHandler.neubestellung.bestellung.addBestellposition(new Bestellposition(produkt));
      }
  }

  async editBestellungsposition(bestellposition: Bestellposition, nonReverseIndex: number){

    let reverseIndex = this.bestellungsHandler.neubestellung.bestellung.bestellpositionen.length - 1 - nonReverseIndex;

    const modal = await this.modalController.create({
      component: BestellungspositionEditModalPage,
      componentProps: {
        bestellposition: bestellposition,
        index: reverseIndex
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
        bestellung: this.bestellungsHandler.neubestellung.bestellung
      },
      cssClass: 'classic-modal',
      showBackdrop: true,
      backdropDismiss: false,
      animated: true
    });

    modal.onDidDismiss()
      .then((data) => {
        if (data.data) {
          this.bestellungsHandler.sendNeubestellungBestellung();
        }

    });

    return await modal.present();
  }



  /*******************************************************************************
  *** Sonstiges
  *******************************************************************************/

  // Cancel Bestellung

  async askForCancelBestellung(){

    await this.frontend.showJaNeinAlert(
      'Abbruch der Bestellung',
      'Willst du die Bestellung wirklich abbrechen? Alle enthaltenen Positionen werden gelöscht.'
    ).then(yes => {
      this.bestellungsHandler.neubestellung.bestellung = null;
      this.bestellungsHandler.neubestellung.status = null;
    }, no => {});

  }

}
