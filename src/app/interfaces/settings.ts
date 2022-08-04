import { environment } from 'src/environments/environment';

// App
export interface AppSettings {
    version: string;
}

// API
export interface APISettings {
    protocol: string;
    host: string;
    path: string;
    url: string;
}

// Storage
export interface StorageSettings {
    prefix: string;
    keys: {
        daten: string
    }
}

// Local
export class LocaleSettings {
    deviceName: string;
    api: string;
    adminPin: string;

    constructor() {
        this.deviceName = '';
        this.api = environment.api;
        this.adminPin = '';
    }
}
