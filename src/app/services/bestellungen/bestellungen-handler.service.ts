import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Bestellung } from 'src/app/classes/bestellung.class';
import { Aufnehmer } from 'src/app/classes/aufnehmer.class';
import { Tisch } from 'src/app/classes/tisch.class';
import { Geraet } from 'src/app/classes/geraet.class';
import { SettingsService } from '../settings/settings.service';
import { FrontendService } from '../frontend/frontend.service';
import { Bestellposition } from 'src/app/classes/bestellposition.class';
import { ApiService } from '../api/api.service';

@Injectable({
    providedIn: 'root'
})
export class BestellungenHandlerService {

    public aufnehmer: Aufnehmer | null = null;

    public neubestellung: any = {
        bestellung: null,
        status: null
    };

    public ansichtsbestellung: any = {
        bestellung: null,
        status: null
    };

    constructor(private api: ApiService, private settings: SettingsService, private frontend: FrontendService) { }

    /*******************************************************************************
    *** Neubestellung
    *******************************************************************************/

    public newNeubestellung() {
        if (this.neubestellung.bestellung === null) {
            this.neubestellung.bestellung = new Bestellung();
            this.neubestellung.bestellung.aufnehmer = this.aufnehmer;
            this.neubestellung.bestellung.geraet = this.settings.locale.geraet;
            this.neubestellung.status = 'begonnen';
            return true;
        }

        return false;
    }

    public addTischToNeubestellung(tisch: Tisch) {
        this.neubestellung.bestellung.tisch = tisch;
        this.neubestellung.bestellung.setTimestampBegonnen();
    }

    public addGeraetToNeubestellung(geraet: Geraet) {
        this.neubestellung.bestellung.geraet = geraet;
    }

    public clearNeubestellung() {
        this.neubestellung.bestellung = null;
        this.neubestellung.status = null;
    }

    public sendNeubestellungBestellung() {
        this.api.createBestellung(this.neubestellung.bestellung).subscribe((bestellung) => {

            this.frontend.showToast("Bestellung erfolgreich angelegt!", 2000);

            this.api.druckBestellung(bestellung).subscribe((bons) => {

                // TODO: If all bons printed
                if (true) {
                    this.frontend.showToast("Alle Bons wurden erfolgreich gedruckt!", 2000);
                } else {
                    this.frontend.showOkAlert('Fehler beim Drucken', 'Es konnten nicht alle Bons gedruckt werden!\n\nWeitere Details unter dem Menüpunkt "Bestellungen".');
                }
            }, (error) => this.frontend.showOkAlert('Fehler beim Drucken der Bons', error.message));
        }, (error) => this.frontend.showOkAlert('Fehler beim Anlegen der Bestellung', error.message));
    }

    /*******************************************************************************
    *** Ansichtsbestellung
    *******************************************************************************/

    // public loadAnsichtsbestellung(id) {
    //     return new Promise((resolve, reject) => {

    //         this.frontend.showLoadingSpinner();
    //         this.http.get<Bestellung>(this.settings.api.url + '/bestellungen/' + id).subscribe(bestellung => {
    //             this.frontend.hideLoadingSpinner();
    //             this.ansichtsbestellung.bestellung = bestellung;
    //             resolve(bestellung);
    //         },
    //             err => {
    //                 this.frontend.hideLoadingSpinner();
    //                 this.frontend.showOkAlert('HTTP Fehler', 'Name: ' + err.name + '\n\nStatus: ' + err.status + '/' + err.statusText + '\n\nNachricht: ' + err.message);
    //                 reject(err);
    //             });

    //     });
    // }

    // public clearAnsichtsbestellung() {
    //     this.ansichtsbestellung.bestellung = null;
    //     this.ansichtsbestellung.status = null;
    // }

    // public printAnsichtsbestellungBestellpositionBon(drucker_id) {
    //     return new Promise((resolve, reject) => {

    //         this.frontend.showLoadingSpinner('send');
    //         this.http.post<any>(this.settings.api.url + '/bestellungen/' + this.ansichtsbestellung.bestellung.id + '/druck/drucker/' + drucker_id, {}).subscribe(data => {
    //             this.frontend.hideLoadingSpinner();
    //             resolve(data);
    //         },
    //             err => {
    //                 this.frontend.hideLoadingSpinner();
    //                 this.frontend.showOkAlert('HTTP Fehler', 'Name: ' + err.name + '\n\nStatus: ' + err.status + '/' + err.statusText + '\n\nNachricht: ' + err.message);
    //                 reject(err);
    //             });
    //     });
    // }

    // public stornoAnsichtsbestellungBestellposition(bestellposition: Bestellposition, anzahl: number) {
    //     return new Promise((resolve, reject) => {

    //         this.frontend.showLoadingSpinner('send');
    //         this.http.post<any>(this.settings.api.url + '/bestellungen/' + bestellposition.bestellungen_id + '/bestellpositionen/' + bestellposition.id + '/storno', { anzahl: anzahl }).subscribe(data => {
    //             this.frontend.hideLoadingSpinner();
    //             resolve(data);
    //         },
    //             err => {
    //                 this.frontend.hideLoadingSpinner();
    //                 this.frontend.showOkAlert('HTTP Fehler', 'Name: ' + err.name + '\n\nStatus: ' + err.status + '/' + err.statusText + '\n\nNachricht: ' + err.message);
    //                 reject(err);
    //             });
    //     });
    // }

}
