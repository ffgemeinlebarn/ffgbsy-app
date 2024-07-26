import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { Aufnehmer } from 'src/app/classes/aufnehmer.model';
import { Bestellposition } from 'src/app/classes/bestellposition.model';
import { Bestellung } from 'src/app/classes/bestellung.model';
import { Bon } from 'src/app/classes/bon.model';
import { BonDruck } from 'src/app/classes/bonDruck';
import { Grundprodukt } from 'src/app/classes/grundprodukt.class';
import { Produkt } from 'src/app/classes/produkt.class';
import { Daten } from 'src/app/interfaces/daten';
import { environment } from 'src/environments/environment';
import { FrontendService } from '../frontend/frontend.service';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private http = inject(HttpClient);
    public frontend = inject(FrontendService);

    public url: string = null;
    private headers: HttpHeaders = null;

    constructor() {
        this.loadEnvironment();
    }

    public loadEnvironment() {
        this.url = environment.api;
    }

    public errorHandler(error: Error | any, silent: boolean = false): Observable<any> {

        if (!silent) {
            this.frontend.hideLoadingSpinner();

            if (error.status == 0) {
                this.frontend.showOkAlert("Es konnte keine Verbindung hergestellt werden!", error.message);
            }

            if (error.status == 500) {
                this.frontend.showOkAlert("Unbekannter Kommunikationsfehler aufgetreten!", error.message);
            }
        }

        // this.logger.error('[API Service] Error Handling', error);
        throw error;
    }

    public getCurrentVersion(): Observable<number> {
        this.frontend.showLoadingSpinner('Vergleiche aktuelle Datenversion');
        return this.http
            .get(`${this.url}/daten/latest`, { headers: this.headers })
            .pipe(
                retry(1),
                tap(() => this.frontend.hideLoadingSpinner()),
                map((data: Daten) => data.version),
                catchError((error) => this.errorHandler(error))
            );
    }

    public getDaten(): Observable<Daten> {
        this.frontend.showLoadingSpinner('Lade neueste Daten');
        return this.http
            .get(`${this.url}/daten/latest`, { headers: this.headers })
            .pipe(
                retry(1),
                tap(() => this.frontend.hideLoadingSpinner()),
                catchError((error) => this.errorHandler(error))
            );
    }

    // public createBestellung(bestellung: Bestellung): Observable<Bestellung> {
    //     this.frontend.showLoadingSpinner('Erstelle Bestellung');
    //     return this.http
    //         .post(`${this.url}/bestellungen`, bestellung, { headers: this.headers })
    //         .pipe(
    //             retry(1),
    //             tap(() => this.frontend.hideLoadingSpinner()),
    //             catchError((error) => this.errorHandler(error))
    //         );
    // }

    public updateAufnehmer(aufnehmer: Aufnehmer): Observable<Bestellung> {
        this.frontend.showLoadingSpinner('Aktualisiere Aufnehmer');
        return this.http
            .put(`${this.url}/aufnehmer/${aufnehmer.id}`, aufnehmer, { headers: this.headers })
            .pipe(
                retry(1),
                tap(() => this.frontend.hideLoadingSpinner()),
                catchError((error) => this.errorHandler(error))
            );
    }

    public createStornoBon(bestellposition: Bestellposition): Observable<Bon> {
        this.frontend.showLoadingSpinner('Erstelle Storno Bon');
        return this.http
            .post(`${this.url}/bons`, {
                type: "storno",
                bestellungen_id: bestellposition.bestellungen_id,
                drucker_id: bestellposition.drucker_id,
                bestellpositionen: [bestellposition]
            }, { headers: this.headers })
            .pipe(
                retry(1),
                tap(() => this.frontend.hideLoadingSpinner()),
                catchError((error) => this.errorHandler(error))
            );
    }

    public druckBons(bons: Array<Bon>): Observable<Array<BonDruck>> {
        this.frontend.showLoadingSpinner('Drucke Bons');
        return this.http
            .post(`${this.url}/bons/druck`, bons, { headers: this.headers })
            .pipe(
                retry(1),
                tap(() => this.frontend.hideLoadingSpinner()),
                catchError((error) => this.errorHandler(error))
            );
    }

    public druckBon(bon: Bon): Observable<BonDruck> {
        this.frontend.showLoadingSpinner('Drucke Bon');
        return this.http
            .post(`${this.url}/bons/${bon.id}/druck`, bon, { headers: this.headers })
            .pipe(
                retry(1),
                tap(() => this.frontend.hideLoadingSpinner()),
                catchError((error) => this.errorHandler(error))
            );
    }

    // public searchBestellungen(params: HttpParams = new HttpParams()): Observable<Array<Bestellung>> {
    //     this.frontend.showLoadingSpinner('Suche Bestellungen');
    //     return this.http
    //         .get(`${this.url}/bestellungen`, { headers: this.headers, params })
    //         .pipe(
    //             retry(1),
    //             tap(() => this.frontend.hideLoadingSpinner()),
    //             catchError((error) => this.errorHandler(error))
    //         );
    // }

    // public getBestellung(id: number): Observable<Bestellung> {
    //     this.frontend.showLoadingSpinner('Empfange Bestellung');
    //     return this.http
    //         .get(`${this.url}/bestellungen/${id}`, { headers: this.headers })
    //         .pipe(
    //             retry(1),
    //             tap(() => this.frontend.hideLoadingSpinner()),
    //             catchError((error) => this.errorHandler(error))
    //         );
    // }

    public getSystemstatus(): Observable<any> {
        this.frontend.showLoadingSpinner('Empfange Systemstatus');
        return this.http
            .get(`${this.url}/status/systemstatus`, { headers: this.headers })
            .pipe(
                retry(1),
                tap(() => this.frontend.hideLoadingSpinner()),
                catchError((error) => this.errorHandler(error))
            );
    }

    public createStornoBestellposition(bestellposition: Bestellposition, anzahl: number): Observable<Bestellposition> {
        this.frontend.showLoadingSpinner('Erstelle Storno Bestellposition');
        return this.http
            .post(`${this.url}/bestellungen/${bestellposition.bestellungen_id}/bestellpositionen/${bestellposition.id}`, { anzahl }, { headers: this.headers })
            .pipe(
                retry(1),
                tap(() => this.frontend.hideLoadingSpinner()),
                catchError((error) => this.errorHandler(error))
            );
    }

    public getStatisticsTimeline(): Observable<any> {
        this.frontend.showLoadingSpinner('Empfange Timeline Statistik');
        return this.http
            .get(`${this.url}/statistiken/timeline`, { headers: this.headers })
            .pipe(
                retry(1),
                tap(() => this.frontend.hideLoadingSpinner()),
                catchError((error) => this.errorHandler(error))
            );

    }

    public getStatisticsKennzahlen(): Observable<any> {
        this.frontend.showLoadingSpinner('Empfange Kennzahlen Statistik');
        return this.http
            .get(`${this.url}/statistiken/kennzahlen`, { headers: this.headers })
            .pipe(
                retry(1),
                tap(() => this.frontend.hideLoadingSpinner()),
                catchError((error) => this.errorHandler(error))
            );
    }

    public getStatisticsProduktbereiche(): Observable<any> {
        this.frontend.showLoadingSpinner('Empfange Produktbereiche Statistik');
        return this.http
            .get(`${this.url}/statistiken/produktbereiche`, { headers: this.headers })
            .pipe(
                retry(1),
                tap(() => this.frontend.hideLoadingSpinner()),
                catchError((error) => this.errorHandler(error))
            );
    }

    public getStatisticsProduktkategorien(): Observable<any> {
        this.frontend.showLoadingSpinner('Empfange Produktkategorien Statistik');
        return this.http
            .get(`${this.url}/statistiken/produktkategorien`, { headers: this.headers })
            .pipe(
                retry(1),
                tap(() => this.frontend.hideLoadingSpinner()),
                catchError((error) => this.errorHandler(error))
            );
    }

    // Grundprodukte

    public readGrundprodukte(): Observable<Array<Grundprodukt>> {
        this.frontend.showLoadingSpinner();
        return this.http
            .get(`${this.url}/grundprodukte`, { headers: this.headers })
            .pipe(
                retry(1),
                tap(() => this.frontend.hideLoadingSpinner()),
                catchError((error) => this.errorHandler(error))
            );
    }

    public readGrundprodukt(id: number): Observable<Grundprodukt> {
        this.frontend.showLoadingSpinner();
        return this.http
            .get(`${this.url}/grundprodukte/${id}`, { headers: this.headers })
            .pipe(
                retry(1),
                tap(() => this.frontend.hideLoadingSpinner()),
                catchError((error) => this.errorHandler(error))
            );
    }

    public updateGrundprodukt(grundprodukt: Grundprodukt): Observable<Grundprodukt> {
        this.frontend.showLoadingSpinner();
        return this.http
            .put(`${this.url}/grundprodukte/${grundprodukt.id}`, grundprodukt, { headers: this.headers })
            .pipe(
                retry(1),
                tap(() => this.frontend.hideLoadingSpinner()),
                catchError((error) => this.errorHandler(error))
            );
    }

    // Produkte

    public readProdukte(): Observable<Array<Produkt>> {
        this.frontend.showLoadingSpinner();
        return this.http
            .get(`${this.url}/produkte`, { headers: this.headers })
            .pipe(
                retry(1),
                tap(() => this.frontend.hideLoadingSpinner()),
                catchError((error) => this.errorHandler(error))
            );
    }

    public readProdukt(id: number): Observable<Produkt> {
        this.frontend.showLoadingSpinner();
        return this.http
            .get(`${this.url}/produkte/${id}`, { headers: this.headers })
            .pipe(
                retry(1),
                tap(() => this.frontend.hideLoadingSpinner()),
                catchError((error) => this.errorHandler(error))
            );
    }

    public updateProdukt(grundprodukt: Produkt): Observable<Produkt> {
        this.frontend.showLoadingSpinner();
        return this.http
            .put(`${this.url}/produkte/${grundprodukt.id}`, grundprodukt, { headers: this.headers })
            .pipe(
                retry(1),
                tap(() => this.frontend.hideLoadingSpinner()),
                catchError((error) => this.errorHandler(error))
            );
    }

    public createProdukt(grundprodukt: Produkt): Observable<Produkt> {
        this.frontend.showLoadingSpinner();
        return this.http
            .post(`${this.url}/produkte/${grundprodukt.id}`, grundprodukt, { headers: this.headers })
            .pipe(
                retry(1),
                tap(() => this.frontend.hideLoadingSpinner()),
                catchError((error) => this.errorHandler(error))
            );
    }

    public searchLogs(params: HttpParams = new HttpParams()): Observable<Array<any>> {
        this.frontend.showLoadingSpinner();
        return this.http
            .get(`${this.url}/logs`, { headers: this.headers, params })
            .pipe(
                retry(1),
                tap(() => this.frontend.hideLoadingSpinner()),
                catchError((error) => this.errorHandler(error))
            );
    }
}
