import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';
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
}
