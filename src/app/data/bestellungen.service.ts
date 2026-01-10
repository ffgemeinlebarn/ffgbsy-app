import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, retry, tap } from 'rxjs';
import { Bestellposition } from 'src/app/model/bestellposition.model';
import { Bestellung } from 'src/app/model/bestellung.model';
import { IBestellungenFilter } from 'src/app/model/bestellungen-filter.interface';
import { ErrorHandlingService } from './error-handling.service';
import { FrontendService } from './frontend.service';
import { SettingsService } from './settings.service';

@Injectable({
    providedIn: 'root',
})
export class BestellungenService {
    private http = inject(HttpClient);
    private settings = inject(SettingsService);
    private errorHandling = inject(ErrorHandlingService);
    private frontendService = inject(FrontendService);

    public checkAvailability(bestellung: Bestellung) {
        return this.http
            .post(
                `${this.settings.apiBaseUrl()}/bestellungen/availability`,
                bestellung
            )
            .pipe(
                catchError((error) =>
                    this.errorHandling.globalApiErrorHandling(error)
                )
            );
    }

    public create(bestellung: Bestellung) {
        this.frontendService.showLoadingSpinner('Bestellung wird angelegt');
        return this.http
            .post<Bestellung>(
                `${this.settings.apiBaseUrl()}/bestellungen`,
                bestellung
            )
            .pipe(
                tap(() => this.frontendService.hideLoadingSpinner()),
                catchError((error) =>
                    this.errorHandling.globalApiErrorHandling(error)
                )
            );
    }

    public createStornoBestellposition(
        bestellposition: Bestellposition,
        anzahl: number
    ): Observable<Bestellposition> {
        this.frontendService.showLoadingSpinner();
        return this.http
            .post(
                `${this.settings.apiBaseUrl()}/bestellungen/${
                    bestellposition.bestellungen_id
                }/bestellpositionen/${bestellposition.id}`,
                { anzahl }
            )
            .pipe(
                tap(() => this.frontendService.hideLoadingSpinner()),
                catchError((error) =>
                    this.errorHandling.globalApiErrorHandling(error)
                )
            );
    }

    public readAll(): Observable<Bestellung[]> {
        return this.http
            .get<Bestellung[]>(`${this.settings.apiBaseUrl()}/bestellungen`)
            .pipe(
                catchError((error) =>
                    this.errorHandling.globalApiErrorHandling(error)
                )
            );
    }

    public read(id: number) {
        return this.http
            .get<Bestellung>(`${this.settings.apiBaseUrl()}/bestellungen/${id}`)
            .pipe(
                catchError((error) =>
                    this.errorHandling.globalApiErrorHandling(error)
                )
            );
    }

    public search(filter: IBestellungenFilter): Observable<Bestellung[]> {
        let params = new HttpParams();

        if (filter.aufnehmerId) {
            params = params.append('aufnehmerId', filter.aufnehmerId);
        }
        if (filter.tischId) {
            params = params.append('tischId', filter.tischId);
        }

        params = params.append('limit', filter.limit);

        return this.http
            .get<Bestellung[]>(`${this.settings.apiBaseUrl()}/bestellungen`, {
                params,
            })
            .pipe(
                retry(1),
                catchError((error) =>
                    this.errorHandling.globalApiErrorHandling(error)
                )
            );
    }

    public update(bestellungen: Bestellung) {
        return this.http
            .put<Bestellung>(
                `${this.settings.apiBaseUrl()}/bestellungen/${bestellungen.id}`,
                bestellungen
            )
            .pipe(
                retry(1),
                catchError((error) =>
                    this.errorHandling.globalApiErrorHandling(error)
                )
            );
    }

    public delete(id: number) {
        return this.http
            .delete<boolean>(`${this.settings.apiBaseUrl()}/bestellungen/${id}`)
            .pipe(
                retry(1),
                catchError((error) =>
                    this.errorHandling.globalApiErrorHandling(error)
                )
            );
    }
}
