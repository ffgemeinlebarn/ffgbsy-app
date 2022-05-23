import { Injectable } from '@angular/core';
import { APISettings, AppSettings, StorageSettings, LocaleSettings } from 'src/app/interfaces/settings';

import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { FrontendService } from '../frontend/frontend.service';
import { Aufnehmer } from 'src/app/classes/aufnehmer.class';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    public app: AppSettings = {
        version: '1.0.0'
    };

    public api: APISettings = {
        protocol: 'https://',
        host: 'internal.ffgbsy.ff-gemeinlebarn.at',
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

    constructor(
        public ionicStorage: Storage,
        public http: HttpClient,
        public frontend: FrontendService
    ) {
        this.api.url = this.api.protocol + this.api.host + this.api.path;
        this.loadLocal();
    }

    loadLocal() {
        this.ionicStorage.get(this.storage.prefix + 'locale').then((val) => {
            if (val !== null) {
                this.locale = <LocaleSettings>JSON.parse(val);
            }
        });
    }

    saveLocal() {
        this.ionicStorage.set(this.storage.prefix + 'locale', JSON.stringify(this.locale));
    }

    saveAufnehmer(aufnehmer: Aufnehmer) {
        return new Promise((resolve, reject) => {

            this.frontend.showLoadingSpinner('send');
            this.http.put<any>(this.api.url + '/aufnehmer/' + aufnehmer.id, aufnehmer).subscribe(data => {
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
