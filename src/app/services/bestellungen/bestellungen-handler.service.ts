import { Injectable, inject } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class BestellungenHandlerService {

    // private api = inject(ApiService);
    // private settings = inject(SettingsService);
    // private frontend = inject(FrontendService);

    // public aufnehmer: Aufnehmer | null = null;
    // public neubestellung: Neubestellung = new Neubestellung();

    // /*******************************************************************************
    // *** Neubestellung
    // *******************************************************************************/

    // public newNeubestellung() {
    //     if (this.neubestellung.bestellung === null) {
    //         this.neubestellung.bestellung = new Bestellung();
    //         this.neubestellung.bestellung.aufnehmer = this.aufnehmer;
    //         this.neubestellung.bestellung.device_name = this.settings.local().deviceName;
    //         this.neubestellung.status = 'begonnen';
    //         return true;
    //     }

    //     return false;
    // }

    // public addTischToNeubestellung(tisch: Tisch) {
    //     this.neubestellung.bestellung.tisch = tisch;
    //     this.neubestellung.bestellung.setTimestampBegonnen();
    // }

    // public clearNeubestellung() {
    //     this.neubestellung.bestellung = null;
    //     this.neubestellung.status = null;
    // }

    // public sendNeubestellungBestellung() {
    //     this.api.createBestellung(this.neubestellung.bestellung).subscribe((bestellung) => {

    //         this.frontend.showToast("Bestellung erfolgreich angelegt!", 2000);
    //         this.clearNeubestellung();

    //         this.api.druckBons(bestellung.bestellbons).subscribe((bons) => {
    //             if (bons.filter(b => !b.success).length == 0) {
    //                 this.frontend.showToast("Alle Bons wurden erfolgreich gedruckt!", 2000);
    //             } else {
    //                 this.frontend.showOkAlert('Fehler beim Drucken', 'Es konnten nicht alle Bons gedruckt werden!\n\nWeitere Details unter dem Menüpunkt "Bestellungen".');
    //             }
    //         }, (error) => this.frontend.showOkAlert('Fehler beim Drucken der Bons', error.message));

    //     }, (errResult) => {
    //         this.frontend.showOkAlert('Fehler beim Anlegen der Bestellung', errResult.error.error.description);
    //     });
    // }
}
