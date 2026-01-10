import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, retry } from 'rxjs';
import { Produktbereich } from 'src/app/classes/produktbereich.class';
import { ErrorHandlingService } from './error-handling.service';
import { SettingsService } from './settings.service';

@Injectable({
    providedIn: 'root',
})
export class ProduktbereicheService {
    http = inject(HttpClient);
    settings = inject(SettingsService);
    errorHandling = inject(ErrorHandlingService);

    public create(produktbereiche: Produktbereich) {
        return this.http
            .post<Produktbereich>(
                `${this.settings.apiBaseUrl()}/produktbereiche`,
                produktbereiche
            )
            .pipe(
                retry(1),
                catchError((error) =>
                    this.errorHandling.globalApiErrorHandling(error)
                )
            );
    }

    public readAll(): Observable<Produktbereich[]> {
        return this.http
            .get<Produktbereich[]>(
                `${this.settings.apiBaseUrl()}/produktbereiche`
            )
            .pipe(
                retry(1),
                catchError((error) =>
                    this.errorHandling.globalApiErrorHandling(error)
                )
            );
    }

    public read(id: number) {
        return this.http
            .get<Produktbereich>(
                `${this.settings.apiBaseUrl()}/produktbereiche/${id}`
            )
            .pipe(
                retry(1),
                catchError((error) =>
                    this.errorHandling.globalApiErrorHandling(error)
                )
            );
    }

    public update(produktbereiche: Produktbereich) {
        return this.http
            .put<Produktbereich>(
                `${this.settings.apiBaseUrl()}/produktbereiche/${
                    produktbereiche.id
                }`,
                produktbereiche
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
            .delete<boolean>(
                `${this.settings.apiBaseUrl()}/produktbereiche/${id}`
            )
            .pipe(
                retry(1),
                catchError((error) =>
                    this.errorHandling.globalApiErrorHandling(error)
                )
            );
    }
}
