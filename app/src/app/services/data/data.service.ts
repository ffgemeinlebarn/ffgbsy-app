import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Daten } from 'src/app/interfaces/daten';
import { SettingsService } from '../settings/settings.service';
import { Aufnehmer } from 'src/app/classes/aufnehmer.class';
import { Produktbereich } from 'src/app/classes/produktbereich.class';
import { Produktkategorie } from 'src/app/classes/produktkategorie.class';
import { Produkt } from 'src/app/classes/produkt.class';
import { Tischkategorie } from 'src/app/classes/tischkategorie.class';
import { Tisch } from 'src/app/classes/tisch.class';
import { Geraet } from 'src/app/classes/geraet.class';

@Injectable({
  providedIn: 'root'
})
export class DataService implements Daten{

  public aufnehmer: Aufnehmer[];
  public geraete: Geraet[];
  public produktbereiche: Produktbereich[];
  public produktkategorien: Produktkategorie[];
  public produkte: Produkt[];
  public tischkategorien: Tischkategorie[];
  public tische: Tisch[];

  public version: number = 0;

  constructor(private settings: SettingsService, private http: HttpClient) {

  }

  loadLocal(){
    
  }

  storeLocal(){

  }

  download(){
    return new Promise(resolve => {
      this.http.get<Daten>(this.settings.api.url + '/daten/latest').subscribe(data => {
        this.aufnehmer = data.aufnehmer;
        this.geraete = data.geraete;
        this.produktbereiche = data.produktbereiche;
        this.produktkategorien = data.produktkategorien;
        this.produkte = data.produkte;
        this.tischkategorien = data.tischkategorien;
        this.tische = data.tische;
        this.version = data.version;
        
        resolve(true);
      },
      err => {
        resolve(false);
        console.log("Error occured: ", err);
      }); 

    });
  }

  getGeraetById(id: number){
    for(let g of this.geraete){
      if (g.id == id){ return g }
      return null;
    }
  }

  getProduktById(id: number){
    for(let p of this.produkte){
      if (p.id == id){ return p }
      return null;
    }
  }

  getProduktByIds(ids: Array<number>){
    let arr: Array<Produkt>;
    for(let p of this.produkte){
      if (ids.indexOf(p.id)){ arr.push(p) }
      return arr;
    }
  }

    


}
