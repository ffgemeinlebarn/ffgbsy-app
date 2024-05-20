import { Injectable, inject, signal } from '@angular/core';
import { LocalSettings } from 'src/app/interfaces/settings';

import { Storage } from '@ionic/storage';
import { FrontendService } from '../frontend/frontend.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    public ionicStorage = inject(Storage);
    public frontend = inject(FrontendService);

    public readonly localStoragePrefix = 'ffgbsy';
    private readonly localSettingsKey = `${this.localStoragePrefix}_local_settings`;
    private readonly initialLocalSettings = {
        notificationPoll: true,
        deviceName: '',
        adminPin: '',
        apiBaseUrl: environment.api
    };

    public apiBaseUrl = signal<string>(environment.api);
    public local = signal<LocalSettings>(this.initialLocalSettings);

    constructor() {
        this.ionicStorage.create();
        this.loadLocal();
    }

    public async loadLocal() {

        // this.logger.debug('[Settings Service] Load Local');
        // this.logger.debug('[Settings Service] Local Object:', this.locale);
        // this.logger.debug('[Settings Service] Service is Ready!');

        const localSettings = await this.ionicStorage.get(this.localSettingsKey);

        if (localSettings == null) {
            await this.saveLocal(this.local());
        } else {
            this.local.set(JSON.parse(localSettings));
        }
    }

    public async saveLocal(settings: LocalSettings) {
        // this.logger.debug('[Settings Service] Save Local');
        await this.ionicStorage.set(this.localSettingsKey, JSON.stringify(settings));
        this.loadLocal();
        this.frontend.showToast("Die lokalen Einstellungen wurden gespeichert!");
    }

}
