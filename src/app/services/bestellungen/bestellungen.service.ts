import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Bestellung } from 'src/app/classes/bestellung.class';
import { Observable, catchError, retry, tap } from 'rxjs';
import { SettingsService } from '../settings/settings.service';
import { ErrorHandlingService } from '../error-handling/error-handling.service';

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
