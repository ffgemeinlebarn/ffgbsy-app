export interface ILocalSettings {
    notificationPoll: boolean;
    deviceName: string;
    deviceIsPrivate: boolean;
    deviceAufnehmerId?: PersonId;
    features: {
        aufnehmen: boolean;
        abrechnungen: boolean;
        bonDebug: boolean;
        produktverwaltung: boolean;
        personenverwaltung: boolean;
        tischverwaltung: boolean;
        statistiken: boolean;
        system: boolean;
    };
    abrechnungKostenstelle: string;
    apiBaseUrl: string;
}
