import { Injectable } from '@angular/core';
import { APISettings, AppSettings, StorageSettings, LocaleSettings } from 'src/app/interfaces/settings';

import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public app: AppSettings = {
    version: '1.0.0'
  };

  public api: APISettings = {
    protocol: 'http://',
    host: '192.168.0.120',
    path: '/v1',
    url: null
  }
  
  public storage: StorageSettings = {
    prefix: 'ffgbsy_',
    keys: {
      daten: 'daten'
    }
  };
  
  public locale: LocaleSettings = {
    diesesGeraetId: null
  };

  constructor(private ionicStorage: Storage)  {
    this.api.url = this.api.protocol + this.api.host + this.api.path;
    this.loadLocal();
  }

  loadLocal(){
    this.ionicStorage.get(this.storage.prefix + 'locale').then((val) => {
      if (val !== null){
        this.locale = <LocaleSettings>JSON.parse(val);
      }
    });
  }

  saveLocal(){
    this.ionicStorage.set(this.storage.prefix + 'locale', JSON.stringify(this.locale));
  }

}