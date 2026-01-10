export interface IBonsFilter {
    missingSuccessfulDruck: boolean;
    multipleDrucke: boolean;
    druckerId: null | number;
    tischId: null | number;
    type: null | 'bestellung' | 'storno';
    limit: number;
}
