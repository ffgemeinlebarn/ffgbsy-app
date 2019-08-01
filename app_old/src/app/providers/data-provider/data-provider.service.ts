import { Injectable } from '@angular/core';
import { Produkt } from '../../classes/produkt.class';
import { GlobalProviderService } from '../global-provider/global-provider.service';
import { Daten } from '../../interfaces/daten'
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { resolve } from 'path';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataProviderService implements Resolve<any> {
  daten: any;

  constructor(public global: GlobalProviderService, private storage: NativeStorage, public http: HttpClient) {
    this.daten = {version: 0};
    //this.feedFromLocalData();
  }

  storeOnlineData(data: Daten){
    return this.storage.setItem(this.global.storage.keys.daten, JSON.stringify(data))
  }

  resolve() {
    return this.storage.getItem(this.global.storage.keys.daten).then((data) => {
      this.daten = JSON.parse(data);
      console.log(new Date(), "resolve");
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

    console.log("bestellung", bestellung);

    let positionen = [];
    let form_data = new FormData();

    form_data.append("tische_id", bestellung.tisch.id);
    form_data.append("timestamp_begonnen", bestellung.timestamp_begonnen);
    form_data.append("aufnehmer_id", "1");//this.global.loggedIn.aufnehmer.id); //bestellung.aufnehmer.id);
    form_data.append("geraete_id", "1");
    
    for (let bp of bestellung.bestellpositionen){

      positionen.push({
        anzahl: bp.anzahl,
        produkte_id: bp.produkt.id,
        notiz: bp.notiz,
        eigenschaften: bp.eigenschaften
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
