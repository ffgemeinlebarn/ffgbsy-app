import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { SettingsService } from './settings.service';

@Injectable({
    providedIn: 'root',
})
export class StatistikenService {
    private readonly http = inject(HttpClient);
    private readonly settingsService = inject(SettingsService);

    public readTimeline(): Observable<any> {
        return this.http.get<any>(`${this.settingsService.apiBaseUrl()}/statistiken/timeline`).pipe(retry(1));
    }

    public readKennzahlen(): Observable<any> {
        return this.http.get<any>(`${this.settingsService.apiBaseUrl()}/statistiken/kennzahlen`).pipe(retry(1));
    }

    public readProduktbereiche(): Observable<any> {
        return this.http.get<any>(`${this.settingsService.apiBaseUrl()}/statistiken/produktbereiche`).pipe(retry(1));
    }

    public readProduktkategorien(): Observable<any> {
        return this.http.get<any>(`${this.settingsService.apiBaseUrl()}/statistiken/produktkategorien`).pipe(retry(1));
    }

    public readProdukte(): Observable<any> {
        return this.http.get<any>(`${this.settingsService.apiBaseUrl()}/statistiken/produkte`).pipe(retry(1));
    }
}
