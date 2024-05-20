import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Tischkategorie } from 'src/app/classes/tischkategorie.class';
import { Observable, catchError, retry } from 'rxjs';
import { SettingsService } from '../settings/settings.service';
import { ErrorHandlingService } from '../error-handling/error-handling.service';

@Injectable({
    providedIn: 'root'
})
export class TischkategorienService {
    http = inject(HttpClient);
    settings = inject(SettingsService);
    errorHandling = inject(ErrorHandlingService);

    public create(tischkategorien: Tischkategorie) {
        return this.http
            .post<Tischkategorie>(`${this.settings.apiBaseUrl()}/tischkategorien`, tischkategorien)
            .pipe(
                retry(1),
                catchError((error) => this.errorHandling.globalApiErrorHandling(error))
            );
    }

    public readAll(): Observable<Tischkategorie[]> {
        return this.http
            .get<Tischkategorie[]>(`${this.settings.apiBaseUrl()}/tischkategorien`)
            .pipe(
                retry(1),
                catchError((error) => this.errorHandling.globalApiErrorHandling(error))
            );
    }

    public read(id: number) {
        return this.http
            .get<Tischkategorie>(`${this.settings.apiBaseUrl()}/tischkategorien/${id}`)
            .pipe(
                retry(1),
                catchError((error) => this.errorHandling.globalApiErrorHandling(error))
            );
    }

    public update(tischkategorien: Tischkategorie) {
        return this.http
            .put<Tischkategorie>(`${this.settings.apiBaseUrl()}/tischkategorien/${tischkategorien.id}`, tischkategorien)
            .pipe(
                retry(1),
                catchError((error) => this.errorHandling.globalApiErrorHandling(error))
            );
    }

    public delete(id: number) {
        return this.http
            .delete<boolean>(`${this.settings.apiBaseUrl()}/tischkategorien/${id}`)
            .pipe(
                retry(1),
                catchError((error) => this.errorHandling.globalApiErrorHandling(error))
            );
    }
}
