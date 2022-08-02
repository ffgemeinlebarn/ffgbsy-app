import { Injectable } from '@angular/core';
import { Bestellung } from 'src/app/classes/bestellung.class';
import { Aufnehmer } from 'src/app/classes/aufnehmer.class';
import { Tisch } from 'src/app/classes/tisch.class';
import { SettingsService } from '../settings/settings.service';
import { FrontendService } from '../frontend/frontend.service';
import { ApiService } from '../api/api.service';
import { Neubestellung } from 'src/app/classes/neubestellung.class';

@Injectable({
    providedIn: 'root'
})
export class BestellungenHandlerService {

    public aufnehmer: Aufnehmer | null = null;
    public neubestellung: Neubestellung = new Neubestellung();

    constructor(private api: ApiService, private settings: SettingsService, private frontend: FrontendService) { }

    /*******************************************************************************
    *** Neubestellung
    *******************************************************************************/

    public newNeubestellung() {
        if (this.neubestellung.bestellung === null) {
            this.neubestellung.bestellung = new Bestellung();
            this.neubestellung.bestellung.aufnehmer = this.aufnehmer;
            this.neubestellung.bestellung.device_name = this.settings.locale.deviceName;
            this.neubestellung.status = 'begonnen';
            return true;
        }

        return false;
    }

    public addTischToNeubestellung(tisch: Tisch) {
        this.neubestellung.bestellung.tisch = tisch;
        this.neubestellung.bestellung.setTimestampBegonnen();
    }

    public clearNeubestellung() {
        this.neubestellung.bestellung = null;
        this.neubestellung.status = null;
    }

    public sendNeubestellungBestellung() {
        this.api.createBestellung(this.neubestellung.bestellung).subscribe((bestellung) => {

            this.frontend.showToast("Bestellung erfolgreich angelegt!", 2000);
            this.clearNeubestellung();

            this.api.druckBestellbons(bestellung.bestellbons).subscribe((bons) => {
                if (bons.filter(b => !b.success).length == 0) {
                    this.frontend.showToast("Alle Bons wurden erfolgreich gedruckt!", 2000);
                } else {
                    this.frontend.showOkAlert('Fehler beim Drucken', 'Es konnten nicht alle Bons gedruckt werden!\n\nWeitere Details unter dem Menüpunkt "Bestellungen".');
                }
            }, (error) => this.frontend.showOkAlert('Fehler beim Drucken der Bons', error.message));

        }, (errResult) => {
            this.frontend.showOkAlert('Fehler beim Anlegen der Bestellung', errResult.error.error.description);
        });
    }
}
