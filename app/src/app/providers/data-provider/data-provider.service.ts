import { Injectable } from '@angular/core';
import { Produkt } from '../../classes/produkt.class';
import { GlobalProviderService } from '../global-provider/global-provider.service';
import { Daten } from '../../interfaces/daten'
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Storage } from '@ionic/storage';;

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {
  daten: any = null;

  constructor(public global:GlobalProviderService, private storage: Storage, public http: HttpClient) {
    this.feedFromLocalData();
  }

  storeOnlineData(data: Daten){
    return this.storage.set(this.global.storage.keys.daten, JSON.stringify(data))
  }

  feedFromLocalData(){
    this.storage.get(this.global.storage.keys.daten).then((data) => {
      this.daten = JSON.parse(data);
    });
  }


  // Produkte

  getProduktById(id: number){
    for(let p of this.daten.produkte){
      if (p.id = id){ return p }
      return null;
    }
  }

  getProduktByIds(ids: Array<number>){
    let arr: Array<Produkt>;
    for(let p of this.daten.produkte){
      if (ids.indexOf(p.id)){ arr.push(p) }
      return arr;
    }
  }

  // Bestellung - SENDEN

  postBestellung(bestellung){

    let positionen = [];
    let form_data = new FormData();

    form_data.append("tische_id", bestellung.tisch.id);
    form_data.append("timestamp_begonnen", bestellung.timestamp_begonnen);
    form_data.append("aufnehmer_id", this.global.loggedIn.aufnehmer.id); //bestellung.aufnehmer.id);
    form_data.append("geraete_id", "1");
    
    for (let bp of bestellung.bestellpositionen){

      positionen.push({
        anzahl: bp.anzahl,
        produkte_id: bp.produkt.id,
        notiz: bp.notiz,
        eigenschaften: bp.produkt.eigenschaften
      });
    }
    form_data.append("positionen", JSON.stringify(positionen));

    this.http.post<any>(this.global.api.baseUrl + '/bestellungen', form_data).subscribe(data => {
      console.log("POST Return", data);
    },
    err => {
      console.log("Error occured: ", err);
    });

    
  }
}
