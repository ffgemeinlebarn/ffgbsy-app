import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Drucker } from 'src/app/classes/drucker.class';
import { Observable, catchError, retry, tap } from 'rxjs';
import { SettingsService } from '../settings/settings.service';
import { ErrorHandlingService } from '../error-handling/error-handling.service';

@Injectable({
    providedIn: 'root'
})
export class DruckerService {
    http = inject(HttpClient);
    settings = inject(SettingsService);
    errorHandling = inject(ErrorHandlingService);

    public create(drucker: Drucker) {
        return this.http
            .post<Drucker>(`${this.settings.apiBaseUrl()}/drucker`, drucker)
            .pipe(
                retry(1),
                catchError((error) => this.errorHandling.globalApiErrorHandling(error))
            );
    }

    public readAll(): Observable<Drucker[]> {
        return this.http
            .get<Drucker[]>(`${this.settings.apiBaseUrl()}/drucker`)
            .pipe(
                retry(1),
                catchError((error) => this.errorHandling.globalApiErrorHandling(error))
            );
    }

    public read(id: number) {
        return this.http
            .get<Drucker>(`${this.settings.apiBaseUrl()}/drucker/${id}`)
            .pipe(
                retry(1),
                catchError((error) => this.errorHandling.globalApiErrorHandling(error))
            );
    }

    public update(drucker: Drucker) {
        return this.http
            .put<Drucker>(`${this.settings.apiBaseUrl()}/drucker/${drucker.id}`, drucker)
            .pipe(
                retry(1),
                catchError((error) => this.errorHandling.globalApiErrorHandling(error))
            );
    }

    public delete(id: number) {
        return this.http
            .delete<boolean>(`${this.settings.apiBaseUrl()}/drucker/${id}`)
            .pipe(
                retry(1),
                catchError((error) => this.errorHandling.globalApiErrorHandling(error))
            );
    }
}
