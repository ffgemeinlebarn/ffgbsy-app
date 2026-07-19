import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { StatistikProduktkategorienUndBereicheDto } from '../../model/dto/statistiken.dto';
import { SettingsService } from '../settings.service';

@Injectable({
    providedIn: 'root',
})
export class StatistikenApiService {
    private readonly http = inject(HttpClient);
    private readonly settingsService = inject(SettingsService);

    public readTimeline(): Observable<any> {
        return this.http.get<any>(`${this.settingsService.apiBaseUrl()}/statistiken/timeline`);
    }

    public readKennzahlen(): Observable<any> {
        return this.http.get<any>(`${this.settingsService.apiBaseUrl()}/statistiken/kennzahlen`);
    }

    public readProduktbereiche() {
        return this.http.get<StatistikProduktkategorienUndBereicheDto>(`${this.settingsService.apiBaseUrl()}/statistiken/produktbereiche`);
    }

    public readProduktkategorien() {
        return this.http.get<StatistikProduktkategorienUndBereicheDto>(`${this.settingsService.apiBaseUrl()}/statistiken/produktkategorien`);
    }

    public readProdukte(): Observable<any> {
        return this.http.get<any>(`${this.settingsService.apiBaseUrl()}/statistiken/produkte`);
    }
}
