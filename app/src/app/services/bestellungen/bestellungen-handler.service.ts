import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Bestellung } from 'src/app/classes/bestellung.class';
import { Aufnehmer } from 'src/app/classes/aufnehmer.class';
import { Tisch } from 'src/app/classes/tisch.class';
import { Geraet } from 'src/app/classes/geraet.class';
import { SettingsService } from '../settings/settings.service';
import { FrontendService } from '../frontend/frontend.service';
import { Bestellposition } from 'src/app/classes/bestellposition.class';

@Injectable({
  providedIn: 'root'
})
export class BestellungenHandlerService {

  public neubestellung: any = {
    bestellung: null,
    status: null
  };

  public ansichtsbestellung: any = {
    bestellung: null,
    status: null
  };

  constructor(private http: HttpClient, private settings: SettingsService, private frontend: FrontendService) { }

  /*******************************************************************************
  *** Neubestellung
  *******************************************************************************/

  public newNeubestellung(){
    if (this.neubestellung.bestellung === null){
      this.neubestellung.bestellung = new Bestellung();
      this.neubestellung.status = 'begonnen';
      return true;
    }

    return false;
  }

  public addTischToNeubestellung(tisch: Tisch){
    this.neubestellung.bestellung.tisch = tisch;
  }
  
  public addAufnehmerToNeubestellung(aufnehmer: Aufnehmer){
    this.neubestellung.bestellung.aufnehmer = aufnehmer;
  }

  public addGeraetToNeubestellung(geraet: Geraet){
    this.neubestellung.bestellung.geraet = geraet;
  }

  public clearNeubestellung(){
    this.neubestellung.bestellung = null;
    this.neubestellung.status = null;
  }

  public sendNeubestellungBestellung(){

    this.frontend.showLoadingSpinner('send');

    let positionen = [];
    let form_data = new FormData();

    form_data.append("tische_id", this.neubestellung.bestellung.tisch.id.toString());
    form_data.append("timestamp_begonnen", this.neubestellung.bestellung.timestamp_begonnen);
    form_data.append("aufnehmer_id", this.neubestellung.bestellung.aufnehmer.id.toString());
    form_data.append("geraete_id", this.neubestellung.bestellung.geraet.id.toString());
    
    for (let bp of this.neubestellung.bestellung.bestellpositionen){

      positionen.push({
        anzahl: bp.anzahl,
        produkte_id: bp.produkt.id,
        notiz: bp.notiz,
        eigenschaften: bp.eigenschaften
      });
    }
    form_data.append("positionen", JSON.stringify(positionen));

    this.http.post<any>(this.settings.api.url + '/bestellungen', form_data).subscribe(data => {

      // Bestellung erfolgreich angelegt?
      if (data.success){

        this.frontend.showToast("Bestellung erfolgreich angelegt!", 2000);
        this.clearNeubestellung();

        this.http.post<any>(this.settings.api.url + '/bestellungen/' + data.bestellungen_id + '/druck', {}).subscribe(data => {

          this.frontend.hideLoadingSpinner();
    
          if (data.all_success){
            this.frontend.showToast("Alle Bons wurden erfolgreich gedruckt!", 2000);
          }else{
            this.frontend.showOkAlert('Fehler beim Drucken', 'Es konnten nicht alle Bons gedruckt werden!\n\nWeitere Details unter dem Menüpunkt "Bestellungen".');
          }
    
        },
        err => {
          this.frontend.hideLoadingSpinner();
          this.frontend.showOkAlert('HTTP Fehler', 'Name: ' + err.name + '\n\nStatus: ' + err.status + '/' + err.statusText + '\n\nNachricht: ' + err.message);
          console.log("Error occured: ", err);
        });
      }else{
        this.frontend.hideLoadingSpinner();
        this.frontend.showOkAlert('Fehler beim Anlegen der Bestellung', data.message);
      }

    },
    err => {
      this.frontend.hideLoadingSpinner();
      this.frontend.showOkAlert('HTTP Fehler', 'Name: ' + err.name + '\n\nStatus: ' + err.status + '/' + err.statusText + '\n\nNachricht: ' + err.message);
      console.log("Error occured: ", err);
    });
  }

  /*******************************************************************************
  *** Ansichtsbestellung
  *******************************************************************************/

  public loadAnsichtsbestellung(id){
    return new Promise((resolve, reject) => {
      
      this.frontend.showLoadingSpinner();
      this.http.get<Bestellung>(this.settings.api.url + '/bestellungen/' + id).subscribe(bestellung => {
        this.frontend.hideLoadingSpinner();
        this.ansichtsbestellung.bestellung = bestellung;
        resolve(bestellung);
      },
      err => {
        this.frontend.hideLoadingSpinner();
        this.frontend.showOkAlert('HTTP Fehler', 'Name: ' + err.name + '\n\nStatus: ' + err.status + '/' + err.statusText + '\n\nNachricht: ' + err.message);
        reject(err);
      });

    });
  }

  public clearAnsichtsbestellung(){
    this.ansichtsbestellung.bestellung = null;
    this.ansichtsbestellung.status = null;
  }

  public printAnsichtsbestellungBestellpositionBon(drucker_id){
    return new Promise((resolve, reject) => {

      this.frontend.showLoadingSpinner('send');
      this.http.post<any>(this.settings.api.url + '/bestellungen/' + this.ansichtsbestellung.bestellung.id + '/druck/drucker/' + drucker_id, {}).subscribe(data => {
        this.frontend.hideLoadingSpinner();
        resolve(data);
      },
      err => {
        this.frontend.hideLoadingSpinner();
        this.frontend.showOkAlert('HTTP Fehler', 'Name: ' + err.name + '\n\nStatus: ' + err.status + '/' + err.statusText + '\n\nNachricht: ' + err.message);
        reject(err);
      });
    });
  }

  public stornoAnsichtsbestellungBestellposition(bestellposition: Bestellposition, anzahl: number){
    return new Promise((resolve, reject) => {
      
      this.frontend.showLoadingSpinner('send');
      this.http.post<any>(this.settings.api.url + '/bestellungen/' + bestellposition.bestellungen_id + '/bestellpositionen/' + bestellposition.id + '/storno', {anzahl: anzahl}).subscribe(data => {
        this.frontend.hideLoadingSpinner();
        resolve(data);
      },
      err => {
        this.frontend.hideLoadingSpinner();
        this.frontend.showOkAlert('HTTP Fehler', 'Name: ' + err.name + '\n\nStatus: ' + err.status + '/' + err.statusText + '\n\nNachricht: ' + err.message);
        reject(err);
      });
    });
  }

}
