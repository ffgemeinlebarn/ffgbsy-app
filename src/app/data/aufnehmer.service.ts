import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, retry } from 'rxjs';
import { IAufnehmer } from 'src/app/model/aufnehmer.model';
import { ErrorHandlingService } from './error-handling.service';
import { SettingsService } from './settings.service';

@Injectable({
    providedIn: 'root',
})
export class AufnehmerService {
    private http = inject(HttpClient);
    private settings = inject(SettingsService);
    private errorHandling = inject(ErrorHandlingService);

    public create(aufnehmer: IAufnehmer) {
        return this.http
            .post<IAufnehmer>(
                `${this.settings.apiBaseUrl()}/aufnehmer`,
                aufnehmer
            )
            .pipe(
                retry(1),
                catchError((error) =>
                    this.errorHandling.globalApiErrorHandling(error)
                )
            );
    }

    public readAll(): Observable<IAufnehmer[]> {
        return this.http
            .get<IAufnehmer[]>(`${this.settings.apiBaseUrl()}/aufnehmer`)
            .pipe(
                retry(1),
                catchError((error) =>
                    this.errorHandling.globalApiErrorHandling(error)
                )
            );
    }

    public read(id: number) {
        return this.http
            .get<IAufnehmer>(`${this.settings.apiBaseUrl()}/aufnehmer/${id}`)
            .pipe(
                retry(1),
                catchError((error) =>
                    this.errorHandling.globalApiErrorHandling(error)
                )
            );
    }

    public update(aufnehmer: IAufnehmer) {
        return this.http
            .put<IAufnehmer>(
                `${this.settings.apiBaseUrl()}/aufnehmer/${aufnehmer.id}`,
                aufnehmer
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
            .delete<boolean>(`${this.settings.apiBaseUrl()}/aufnehmer/${id}`)
            .pipe(
                retry(1),
                catchError((error) =>
                    this.errorHandling.globalApiErrorHandling(error)
                )
            );
    }
}
