import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Tisch } from 'src/app/classes/tisch.class';
import { Observable, catchError, retry } from 'rxjs';
import { SettingsService } from '../settings/settings.service';
import { ErrorHandlingService } from '../error-handling/error-handling.service';

@Injectable({
    providedIn: 'root'
})
export class TischeService {
    http = inject(HttpClient);
    settings = inject(SettingsService);
    errorHandling = inject(ErrorHandlingService);

    public create(tische: Tisch) {
        return this.http
            .post<Tisch>(`${this.settings.apiBaseUrl()}/tische`, tische)
            .pipe(
                retry(1),
                catchError((error) => this.errorHandling.globalApiErrorHandling(error))
            );
    }

    public readAll(): Observable<Tisch[]> {
        return this.http
            .get<Tisch[]>(`${this.settings.apiBaseUrl()}/tische`)
            .pipe(
                retry(1),
                catchError((error) => this.errorHandling.globalApiErrorHandling(error))
            );
    }

    public read(id: number) {
        return this.http
            .get<Tisch>(`${this.settings.apiBaseUrl()}/tische/${id}`)
            .pipe(
                retry(1),
                catchError((error) => this.errorHandling.globalApiErrorHandling(error))
            );
    }

    public update(tische: Tisch) {
        return this.http
            .put<Tisch>(`${this.settings.apiBaseUrl()}/tische/${tische.id}`, tische)
            .pipe(
                retry(1),
                catchError((error) => this.errorHandling.globalApiErrorHandling(error))
            );
    }

    public delete(id: number) {
        return this.http
            .delete<boolean>(`${this.settings.apiBaseUrl()}/tische/${id}`)
            .pipe(
                retry(1),
                catchError((error) => this.errorHandling.globalApiErrorHandling(error))
            );
    }
}
