import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, retry, catchError, map } from 'rxjs/operators';
import { Aufnehmer } from 'src/app/classes/aufnehmer.class';
import { Bestellung } from 'src/app/classes/bestellung.class';
import { Daten } from 'src/app/interfaces/daten';
import { environment } from 'src/environments/environment';
import { FrontendService } from '../frontend/frontend.service';
import { SettingsService } from '../settings/settings.service';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    public ready: Promise<any>;
    private url: string = null;
    private headers: HttpHeaders = null;

    constructor(private http: HttpClient, private frontend: FrontendService, private settings: SettingsService) {

        this.settings.ready.then(() => {
            this.url = this.settings.locale.api ?? environment.api;
            this.ready = Promise.resolve(undefined);
        });
    }

    public errorHandler(error: Error | any): Observable<any> {
        this.frontend.hideLoadingSpinner();
        this.frontend.showOkAlert('HTTP Fehler', 'Name: ' + error.name + '\n\nStatus: ' + error.status + '/' + error.statusText + '\n\nNachricht: ' + error.message);
        return throwError(error);
    }

    public getCurrentVersion(): Observable<number> {
        this.frontend.showLoadingSpinner('send');
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
        this.frontend.showLoadingSpinner('send');
        return this.http
            .get(`${this.url}/daten/latest`, { headers: this.headers })
            .pipe(
                retry(1),
                tap(() => this.frontend.hideLoadingSpinner()),
                catchError((error) => this.errorHandler(error))
            );
    }

    public createBestellung(bestellung: Bestellung): Observable<Bestellung> {
        return this.http
            .post(`${this.url}/bestellungen`, bestellung, { headers: this.headers })
            .pipe(
                retry(1),
                tap(() => this.frontend.hideLoadingSpinner()),
                catchError((error) => this.errorHandler(error))
            );
    }

    public updateAufnehmer(aufnehmer: Aufnehmer): Observable<Bestellung> {
        this.frontend.showLoadingSpinner('send');
        return this.http
            .put(`${this.url}/aufnehmer/${aufnehmer.id}`, aufnehmer, { headers: this.headers })
            .pipe(
                retry(1),
                tap(() => this.frontend.hideLoadingSpinner()),
                catchError((error) => this.errorHandler(error))
            );
    }

    public druckBestellung(bestellung: Bestellung): Observable<Array<any>> {
        this.frontend.showLoadingSpinner('send');
        return this.http
            .post(`${this.url}/bons/druck/bestellung/${bestellung.id}`, null, { headers: this.headers })
            .pipe(
                retry(1),
                tap(() => this.frontend.hideLoadingSpinner()),
                catchError((error) => this.errorHandler(error))
            );
    }

    public getSystemstatus(): Observable<any> {
        this.frontend.showLoadingSpinner(null, 'Prüfe Systemstatus');
        return this.http
            .get(`${this.url}/systemstatus`, { headers: this.headers })
            .pipe(
                retry(1),
                tap(() => this.frontend.hideLoadingSpinner()),
                catchError((error) => this.errorHandler(error))
            );
    }
}
