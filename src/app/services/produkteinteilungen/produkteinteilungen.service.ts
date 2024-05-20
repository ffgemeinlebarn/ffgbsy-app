import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { retry, catchError, Observable } from 'rxjs';
import { ErrorHandlingService } from '../error-handling/error-handling.service';
import { SettingsService } from '../settings/settings.service';
import { Produkteinteilung } from 'src/app/classes/produkteinteilung.class';

@Injectable({
    providedIn: 'root'
})
export class ProdukteinteilungenService {
    http = inject(HttpClient);
    settings = inject(SettingsService);
    errorHandling = inject(ErrorHandlingService);

    public create(produkteinteilungen: Produkteinteilung) {
        return this.http
            .post<Produkteinteilung>(`${this.settings.apiBaseUrl()}/produkteinteilungen`, produkteinteilungen)
            .pipe(
                retry(1),
                catchError((error) => this.errorHandling.globalApiErrorHandling(error))
            );
    }

    public readAll(): Observable<Produkteinteilung[]> {
        return this.http
            .get<Produkteinteilung[]>(`${this.settings.apiBaseUrl()}/produkteinteilungen`)
            .pipe(
                retry(1),
                catchError((error) => this.errorHandling.globalApiErrorHandling(error))
            );
    }

    public read(id: number) {
        return this.http
            .get<Produkteinteilung>(`${this.settings.apiBaseUrl()}/produkteinteilungen/${id}`)
            .pipe(
                retry(1),
                catchError((error) => this.errorHandling.globalApiErrorHandling(error))
            );
    }

    public update(produkteinteilungen: Produkteinteilung) {
        return this.http
            .put<Produkteinteilung>(`${this.settings.apiBaseUrl()}/produkteinteilungen/${produkteinteilungen.id}`, produkteinteilungen)
            .pipe(
                retry(1),
                catchError((error) => this.errorHandling.globalApiErrorHandling(error))
            );
    }

    public delete(id: number) {
        return this.http
            .delete<boolean>(`${this.settings.apiBaseUrl()}/produkteinteilungen/${id}`)
            .pipe(
                retry(1),
                catchError((error) => this.errorHandling.globalApiErrorHandling(error))
            );
    }
}
