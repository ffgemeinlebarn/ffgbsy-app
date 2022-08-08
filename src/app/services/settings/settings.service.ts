import { Injectable } from '@angular/core';
import { LocaleSettings } from 'src/app/interfaces/settings';

import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { FrontendService } from '../frontend/frontend.service';
import { NGXLogger } from 'ngx-logger';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    public ready: Promise<any>;
    public StoragePrefix = 'ffgbsy_';

    public locale: LocaleSettings = {
        deviceName: '',
        api: '',
        adminPin: ''
    };

    constructor(
        private logger: NGXLogger,
        public ionicStorage: Storage,
        public http: HttpClient,
        public frontend: FrontendService
    ) {
        this.loadLocal();
    }

    public loadLocal() {
        this.logger.debug('[Settings Service] Load Local');
        this.ready = new Promise((resolve, reject) => this.ionicStorage.get(this.StoragePrefix + 'locale').then(async (val) => {
            this.logger.debug('[Settings Service] Loaded', val);

            if (val == null) {
                this.logger.debug('[Settings Service] Keine lokalen Einstellungen vorhanden!');
                this.locale = new LocaleSettings();
                await this.ionicStorage.set(this.StoragePrefix + 'locale', JSON.stringify(this.locale));
            } else {
                this.locale = <LocaleSettings>JSON.parse(val);
            }

            this.logger.debug('[Settings Service] Local Object:', this.locale);
            this.logger.debug('[Settings Service] Service is Ready!');
            resolve(this.locale);
        }));
    }

    public async saveLocal() {
        this.logger.debug('[Settings Service] Save Local');
        await this.ionicStorage.set(this.StoragePrefix + 'locale', JSON.stringify(this.locale));
        this.loadLocal();
        this.frontend.showToast("Die lokalen Einstellungen wurden gespeichert!");
    }

}
