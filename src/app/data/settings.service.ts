import { Injectable, computed, inject, signal } from '@angular/core';
import { ILocalSettings } from 'src/app/model/i-local-settings.interface';

import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { FrontendService } from './frontend.service';

@Injectable({
    providedIn: 'root',
})
export class SettingsService {
    public ionicStorage = inject(Storage);
    public frontend = inject(FrontendService);

    public readonly localStoragePrefix = 'ffgbsy';
    private readonly localSettingsKey = `${this.localStoragePrefix}_local_settings`;
    private readonly initialLocalSettings = {
        notificationPoll: true,
        deviceName: '',
        deviceIsPrivate: false,
        deviceAufnehmerId: undefined,
        bonDebugMenu: false,
        adminPin: '',
        apiBaseUrl: environment.api,
    };

    public apiBaseUrl = computed(() => this.local().apiBaseUrl ?? environment.api);
    public local = signal<ILocalSettings>(this.initialLocalSettings);

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
            this.local.set(localSettings);
        }
    }

    public async saveLocal(settings: ILocalSettings, hideToast = false) {
        // this.logger.debug('[Settings Service] Save Local');
        await this.ionicStorage.set(this.localSettingsKey, settings);
        await this.loadLocal();

        if (!hideToast) {
            this.frontend.showToast('Die lokalen Einstellungen wurden gespeichert!');
        }
    }
}
