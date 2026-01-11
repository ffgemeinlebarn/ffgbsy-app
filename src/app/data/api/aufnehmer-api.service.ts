import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { IAufnehmer } from 'src/app/model/i-aufnehmer.model';
import { SettingsService } from '../settings.service';

@Injectable({
    providedIn: 'root',
})
export class AufnehmerApiService {
    private readonly http = inject(HttpClient);
    private readonly settings = inject(SettingsService);

    public create(aufnehmer: IAufnehmer) {
        return this.http.post<IAufnehmer>(`${this.settings.apiBaseUrl()}/aufnehmer`, aufnehmer).pipe(retry(1));
    }

    public readAll(): Observable<IAufnehmer[]> {
        return this.http.get<IAufnehmer[]>(`${this.settings.apiBaseUrl()}/aufnehmer`).pipe(retry(1));
    }

    public read(id: number) {
        return this.http.get<IAufnehmer>(`${this.settings.apiBaseUrl()}/aufnehmer/${id}`).pipe(retry(1));
    }

    public update(aufnehmer: IAufnehmer) {
        return this.http.put<IAufnehmer>(`${this.settings.apiBaseUrl()}/aufnehmer/${aufnehmer.id}`, aufnehmer).pipe(retry(1));
    }

    public delete(id: number) {
        return this.http.delete<boolean>(`${this.settings.apiBaseUrl()}/aufnehmer/${id}`).pipe(retry(1));
    }
}
