import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Produkt } from 'src/app/classes/produkt.class';
import { Observable, catchError, retry } from 'rxjs';
import { SettingsService } from '../settings/settings.service';
import { ErrorHandlingService } from '../error-handling/error-handling.service';

@Injectable({
    providedIn: 'root'
})
export class ProdukteService {
    http = inject(HttpClient);
    settings = inject(SettingsService);
    errorHandling = inject(ErrorHandlingService);

    public create(produkte: Produkt) {
        return this.http
            .post<Produkt>(`${this.settings.apiBaseUrl()}/produkte`, produkte)
            .pipe(
                retry(1),
                catchError((error) => this.errorHandling.globalApiErrorHandling(error))
            );
    }

    public readAll(): Observable<Produkt[]> {
        return this.http
            .get<Produkt[]>(`${this.settings.apiBaseUrl()}/produkte`)
            .pipe(
                retry(1),
                catchError((error) => this.errorHandling.globalApiErrorHandling(error))
            );
    }

    public read(id: number) {
        return this.http
            .get<Produkt>(`${this.settings.apiBaseUrl()}/produkte/${id}`)
            .pipe(
                retry(1),
                catchError((error) => this.errorHandling.globalApiErrorHandling(error))
            );
    }

    public update(produkte: Produkt) {
        return this.http
            .put<Produkt>(`${this.settings.apiBaseUrl()}/produkte/${produkte.id}`, produkte)
            .pipe(
                retry(1),
                catchError((error) => this.errorHandling.globalApiErrorHandling(error))
            );
    }

    public delete(id: number) {
        return this.http
            .delete<boolean>(`${this.settings.apiBaseUrl()}/produkte/${id}`)
            .pipe(
                retry(1),
                catchError((error) => this.errorHandling.globalApiErrorHandling(error))
            );
    }
}
