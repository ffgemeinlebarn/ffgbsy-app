import { Injectable, computed, inject, signal } from '@angular/core';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { ILocalSettings } from '../model/interfaces/i-local-settings.interface';
import { FrontendService } from './frontend.service';

@Injectable({
    providedIn: 'root',
})
export class SettingsService {
    public storage = inject(Storage);
    public frontend = inject(FrontendService);

    public readonly localStoragePrefix = 'ffgbsy';
    private readonly localSettingsKey = `${this.localStoragePrefix}_local_settings`;
    private readonly initialLocalSettings: ILocalSettings = {
        notificationPoll: true,
        deviceName: '',
        deviceIsPrivate: false,
        deviceAufnehmerId: undefined,
        features: {
            aufnehmen: true,
            abrechnungen: false,
            bonDebug: false,
            produktverwaltung: false,
            personenverwaltung: false,
            tischverwaltung: false,
            statistiken: false,
            system: false,
        },
        abrechnungKostenstelle: '',
        apiBaseUrl: environment.api,
    };

    public apiBaseUrl = computed(() => this.local().apiBaseUrl ?? environment.api);
    public local = signal<ILocalSettings>(this.initialLocalSettings);

    constructor() {
        this.storage.create();
        this.loadLocal();
    }

    public async loadLocal() {
        const localSettings = (await this.storage.get(this.localSettingsKey)) as ILocalSettings;

        if (localSettings?.features) {
            this.local.set(localSettings);
        } else {
            console.log('[FFGBSY] Settings Service: local Settings are not set or empty');
            this.local.set(this.initialLocalSettings);
        }
    }

    public async saveLocal(settings: ILocalSettings, hideToast = false) {
        console.log('[FFGBSY] Settings Service: Save local Settings');
        await this.storage.set(this.localSettingsKey, settings);
        await this.loadLocal();

        if (!hideToast) {
            this.frontend.showToast('Die lokalen Einstellungen wurden gespeichert!');
        }
    }
}
