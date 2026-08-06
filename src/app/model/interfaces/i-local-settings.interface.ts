export interface ILocalSettings {
    notificationPoll: boolean;
    deviceName: string;
    deviceIsPrivate: boolean;
    deviceAufnehmerId?: PersonId;
    deviceSplitPaneBreakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
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
