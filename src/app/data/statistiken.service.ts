import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, retry } from 'rxjs';
import { ErrorHandlingService } from './error-handling.service';
import { SettingsService } from './settings.service';

@Injectable({
    providedIn: 'root',
})
export class StatistikenService {
    private http = inject(HttpClient);
    private settingsService = inject(SettingsService);
    private errorHandlingService = inject(ErrorHandlingService);

    public readTimeline(): Observable<any> {
        return this.http
            .get<any>(
                `${this.settingsService.apiBaseUrl()}/statistiken/timeline`
            )
            .pipe(
                retry(1),
                catchError((error) =>
                    this.errorHandlingService.globalApiErrorHandling(error)
                )
            );
    }

    public readKennzahlen(): Observable<any> {
        return this.http
            .get<any>(
                `${this.settingsService.apiBaseUrl()}/statistiken/kennzahlen`
            )
            .pipe(
                retry(1),
                catchError((error) =>
                    this.errorHandlingService.globalApiErrorHandling(error)
                )
            );
    }

    public readProduktbereiche(): Observable<any> {
        return this.http
            .get<any>(
                `${this.settingsService.apiBaseUrl()}/statistiken/produktbereiche`
            )
            .pipe(
                retry(1),
                catchError((error) =>
                    this.errorHandlingService.globalApiErrorHandling(error)
                )
            );
    }

    public readProduktkategorien(): Observable<any> {
        return this.http
            .get<any>(
                `${this.settingsService.apiBaseUrl()}/statistiken/produktkategorien`
            )
            .pipe(
                retry(1),
                catchError((error) =>
                    this.errorHandlingService.globalApiErrorHandling(error)
                )
            );
    }

    public readProdukte(): Observable<any> {
        return this.http
            .get<any>(
                `${this.settingsService.apiBaseUrl()}/statistiken/produkte`
            )
            .pipe(
                retry(1),
                catchError((error) =>
                    this.errorHandlingService.globalApiErrorHandling(error)
                )
            );
    }
}
