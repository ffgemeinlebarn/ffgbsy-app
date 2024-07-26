import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, retry } from 'rxjs';
import { Bestellung } from 'src/app/classes/bestellung.model';
import { IBestellungenFilter } from 'src/app/interfaces/bestellungen-filter.type';
import { ErrorHandlingService } from '../error-handling/error-handling.service';
import { SettingsService } from '../settings/settings.service';

@Injectable({
    providedIn: 'root'
})
export class BestellungenService {
    http = inject(HttpClient);
    settings = inject(SettingsService);
    errorHandling = inject(ErrorHandlingService);

    public create(bestellungen: Bestellung) {
        return this.http
            .post<Bestellung>(`${this.settings.apiBaseUrl()}/bestellungen`, bestellungen)
            .pipe(
                retry(1),
                catchError((error) => this.errorHandling.globalApiErrorHandling(error))
            );
    }

    public readAll(): Observable<Bestellung[]> {
        return this.http
            .get<Bestellung[]>(`${this.settings.apiBaseUrl()}/bestellungen`)
            .pipe(
                retry(1),
                catchError((error) => this.errorHandling.globalApiErrorHandling(error))
            );
    }

    public read(id: number) {
        return this.http
            .get<Bestellung>(`${this.settings.apiBaseUrl()}/bestellungen/${id}`)
            .pipe(
                retry(1),
                catchError((error) => this.errorHandling.globalApiErrorHandling(error))
            );
    }

    public search(filter: IBestellungenFilter): Observable<Bestellung[]> {
        let params = new HttpParams();

        if (filter.aufnehmerId) {
            params = params.append("aufnehmerId", filter.aufnehmerId);
        }
        if (filter.tischId) {
            params = params.append("tischId", filter.tischId);
        }

        params = params.append("limit", filter.limit);

        return this.http
            .get<Bestellung[]>(`${this.settings.apiBaseUrl()}/bestellungen`, { params })
            .pipe(
                retry(1),
                catchError((error) => this.errorHandling.globalApiErrorHandling(error))
            );
    }

    public update(bestellungen: Bestellung) {
        return this.http
            .put<Bestellung>(`${this.settings.apiBaseUrl()}/bestellungen/${bestellungen.id}`, bestellungen)
            .pipe(
                retry(1),
                catchError((error) => this.errorHandling.globalApiErrorHandling(error))
            );
    }

    public delete(id: number) {
        return this.http
            .delete<boolean>(`${this.settings.apiBaseUrl()}/bestellungen/${id}`)
            .pipe(
                retry(1),
                catchError((error) => this.errorHandling.globalApiErrorHandling(error))
            );
    }
}
