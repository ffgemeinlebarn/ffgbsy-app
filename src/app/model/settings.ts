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
        daten: string;
    };
}

// Local
export interface LocalSettings {
    notificationPoll: boolean;
    deviceName: string;
    deviceIsPrivate: boolean;
    deviceAufnehmerId?: number;
    bonDebugMenu: boolean;
    adminPin: string;
    apiBaseUrl: string;
}
