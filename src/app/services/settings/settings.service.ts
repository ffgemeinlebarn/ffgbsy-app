import { Injectable } from '@angular/core';
import { APISettings, AppSettings, StorageSettings, LocaleSettings, SessionSettings } from 'src/app/interfaces/settings';

import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { FrontendService } from '../frontend/frontend.service';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    public ready: Promise<any>;
    public StoragePrefix = 'ffgbsy_';

    public locale: LocaleSettings = {
        geraet: null,
        api: ''
    };

    constructor(
        public ionicStorage: Storage,
        public http: HttpClient,
        public frontend: FrontendService
    ) {
        this.loadLocal();
    }

    private loadLocal() {
        console.log('[FFGBSY]', 'Load Local');
        this.ready = new Promise((resolve, reject) => this.ionicStorage.get(this.StoragePrefix + 'locale').then(async (val) => {
            console.log('[FFGBSY]', 'Settings ', 'Loaded: ', val);

            if (val == null) {
                console.log('[FFGBSY]', 'Settings ', 'Keine lokalen Einstellungen vorhanden!');
                this.locale = new LocaleSettings();
                await this.ionicStorage.set(this.StoragePrefix + 'locale', JSON.stringify(this.locale));
            } else {
                this.locale = <LocaleSettings>JSON.parse(val);
            }

            console.log('[FFGBSY]', 'Settings', 'Local Object: ', this.locale);
            console.log('[FFGBSY]', 'Settings', 'Service is Ready!');
            resolve(this.locale);
        }));
    }

    public async saveLocal() {
        console.log('[FFGBSY]', 'Save Local');
        await this.ionicStorage.set(this.StoragePrefix + 'locale', JSON.stringify(this.locale));
        this.loadLocal();
    }

    public saveAufnehmer() { }

}
