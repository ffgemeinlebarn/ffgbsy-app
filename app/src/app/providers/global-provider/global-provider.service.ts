import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalProviderService {

  public loggedIn: any;
  public api: any;
  public system: any;
  public storage: any;

  constructor() {

    this.system = {
      connectivity: {
        wlan_aktiv: null,
        lan_erreichbar: null,
      },
      app:{
        version: '1.2.1',
      },
      daten:{
        version: 0
      }
    }

    this.storage = {
      prefix: 'ffgk_localstorage_',
      keys: {
        daten: 'ffgk_localstorage_daten'
      }
    };

    this.api = {
      baseUrl: 'http://192.168.0.120/v1'
    };

    this.loggedIn = {
      status: false,
      aufnehmer: {
        id: null,
        vorname: null,
        nachname: null
      },
      geraet:{
        id: null
      }
    };
  }

  logout(){
    this.loggedIn = {
      status: false,
      aufnehmer: {
        id: null,
        vorname: null,
        nachname: null
      },
      geraet:{
        id: null
      }
    };
  }
}
