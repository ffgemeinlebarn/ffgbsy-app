import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Bestellung } from 'src/app/classes/bestellung.class';
import { Aufnehmer } from 'src/app/classes/aufnehmer.class';
import { Tisch } from 'src/app/classes/tisch.class';
import { Geraet } from 'src/app/classes/geraet.class';
import { SettingsService } from '../settings/settings.service';
import { FrontendService } from '../frontend/frontend.service';

@Injectable({
  providedIn: 'root'
})
export class BestellungenHandlerService {

  public current: Bestellung = null;
  public status: string = null;

  constructor(private http: HttpClient, private settings: SettingsService, private frontend: FrontendService) { }

  public newCurrent(){
    if (this.current === null){
      this.current = new Bestellung();
      this.status = 'current-begonnen';
      return true;
    }

    return false;
  }

  public addTischToCurrent(tisch: Tisch){
    this.current.tisch = tisch;
  }
  
  public addAufnehmerToCurrent(aufnehmer: Aufnehmer){
    this.current.aufnehmer = aufnehmer;
  }

  public addGeraetToCurrent(geraet: Geraet){
    this.current.geraet = geraet;
  }

  public clearCurrent(){
    this.current = null;
    this.status = null;
  }

  public sendCurrentBestellung(){

    this.frontend.showLoadingSpinner('send');

    let positionen = [];
    let form_data = new FormData();

    form_data.append("tische_id", this.current.tisch.id.toString());
    form_data.append("timestamp_begonnen", this.current.timestamp_begonnen);
    form_data.append("aufnehmer_id", this.current.aufnehmer.id.toString());
    form_data.append("geraete_id", this.current.geraet.id.toString());
    
    for (let bp of this.current.bestellpositionen){

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
        this.clearCurrent();

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
        this.frontend.showOkAlert('Fehler beim Anlegen der Bestellung', 'Die Bestellung wurde nicht angelegt!\n\n' + data.message);
      }

    },
    err => {
      this.frontend.hideLoadingSpinner();
      this.frontend.showOkAlert('HTTP Fehler', 'Name: ' + err.name + '\n\nStatus: ' + err.status + '/' + err.statusText + '\n\nNachricht: ' + err.message);
      console.log("Error occured: ", err);
    });
  }
}
