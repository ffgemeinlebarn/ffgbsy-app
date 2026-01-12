import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { SettingsService } from './settings.service';

@Injectable({
    providedIn: 'root',
})
export class StatistikenService {
    private readonly http = inject(HttpClient);
    private readonly settingsService = inject(SettingsService);

    public readTimeline(): Observable<any> {
        return this.http.get<any>(`${this.settingsService.apiBaseUrl()}/statistiken/timeline`);
    }

    public readKennzahlen(): Observable<any> {
        return this.http.get<any>(`${this.settingsService.apiBaseUrl()}/statistiken/kennzahlen`);
    }

    public readProduktbereiche(): Observable<any> {
        return this.http.get<any>(`${this.settingsService.apiBaseUrl()}/statistiken/produktbereiche`);
    }

    public readProduktkategorien(): Observable<any> {
        return this.http.get<any>(`${this.settingsService.apiBaseUrl()}/statistiken/produktkategorien`);
    }

    public readProdukte(): Observable<any> {
        return this.http.get<any>(`${this.settingsService.apiBaseUrl()}/statistiken/produkte`);
    }
}
