import { HttpClient } from '@angular/common/http';
import { Injectable, effect, inject } from '@angular/core';
import { Aufnehmer } from 'src/app/classes/aufnehmer.class';
import { FrontendService } from '../frontend/frontend.service';
import { Observable, catchError, retry, tap } from 'rxjs';
import { ApiService } from '../api/api.service';
import { SettingsService } from '../settings/settings.service';

@Injectable({
    providedIn: 'root'
})
export class AufnehmerService {
    http = inject(HttpClient);
    frontend = inject(FrontendService);
    api = inject(ApiService);
    settings = inject(SettingsService);

    public create(aufnehmer: Aufnehmer) {
        return this.http
            .post<Aufnehmer>(`${this.settings.apiBaseUrl()}/aufnehmer`, aufnehmer)
            .pipe(
                retry(1),
                catchError((error) => this.api.errorHandler(error))
            );
    }

    public readAll(): Observable<Aufnehmer[]> {
        return this.http
            .get<Aufnehmer[]>(`${this.settings.apiBaseUrl()}/aufnehmer`)
            .pipe(
                retry(1),
                catchError((error) => this.api.errorHandler(error))
            );
    }

    public read(id: number) {
        return this.http
            .get<Aufnehmer>(`${this.settings.apiBaseUrl()}/aufnehmer/${id}`)
            .pipe(
                retry(1),
                catchError((error) => this.api.errorHandler(error))
            );
    }

    public update(aufnehmer: Aufnehmer) {
        return this.http
            .put<Aufnehmer>(`${this.settings.apiBaseUrl()}/aufnehmer/${aufnehmer.id}`, aufnehmer)
            .pipe(
                retry(1),
                catchError((error) => this.api.errorHandler(error))
            );
    }

    public delete(id: number) {
        return this.http
            .delete<boolean>(`${this.settings.apiBaseUrl()}/aufnehmer/${id}`)
            .pipe(
                retry(1),
                catchError((error) => this.api.errorHandler(error))
            );
    }
}
