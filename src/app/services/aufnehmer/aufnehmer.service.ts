import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Aufnehmer } from 'src/app/classes/aufnehmer.model';
import { Observable, catchError, retry, tap } from 'rxjs';
import { SettingsService } from '../settings/settings.service';
import { ErrorHandlingService } from '../error-handling/error-handling.service';

@Injectable({
    providedIn: 'root'
})
export class AufnehmerService {
    http = inject(HttpClient);
    settings = inject(SettingsService);
    errorHandling = inject(ErrorHandlingService);

    public create(aufnehmer: Aufnehmer) {
        return this.http
            .post<Aufnehmer>(`${this.settings.apiBaseUrl()}/aufnehmer`, aufnehmer)
            .pipe(
                retry(1),
                catchError((error) => this.errorHandling.globalApiErrorHandling(error))
            );
    }

    public readAll(): Observable<Aufnehmer[]> {
        return this.http
            .get<Aufnehmer[]>(`${this.settings.apiBaseUrl()}/aufnehmer`)
            .pipe(
                retry(1),
                catchError((error) => this.errorHandling.globalApiErrorHandling(error))
            );
    }

    public read(id: number) {
        return this.http
            .get<Aufnehmer>(`${this.settings.apiBaseUrl()}/aufnehmer/${id}`)
            .pipe(
                retry(1),
                catchError((error) => this.errorHandling.globalApiErrorHandling(error))
            );
    }

    public update(aufnehmer: Aufnehmer) {
        return this.http
            .put<Aufnehmer>(`${this.settings.apiBaseUrl()}/aufnehmer/${aufnehmer.id}`, aufnehmer)
            .pipe(
                retry(1),
                catchError((error) => this.errorHandling.globalApiErrorHandling(error))
            );
    }

    public delete(id: number) {
        return this.http
            .delete<boolean>(`${this.settings.apiBaseUrl()}/aufnehmer/${id}`)
            .pipe(
                retry(1),
                catchError((error) => this.errorHandling.globalApiErrorHandling(error))
            );
    }
}
