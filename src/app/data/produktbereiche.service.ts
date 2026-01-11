import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { Produktbereich } from 'src/app/model/produktbereich.class';
import { SettingsService } from './settings.service';

@Injectable({
    providedIn: 'root',
})
export class ProduktbereicheService {
    http = inject(HttpClient);
    settings = inject(SettingsService);

    public create(produktbereiche: Produktbereich) {
        return this.http.post<Produktbereich>(`${this.settings.apiBaseUrl()}/produktbereiche`, produktbereiche).pipe(retry(1));
    }

    public readAll(): Observable<Produktbereich[]> {
        return this.http.get<Produktbereich[]>(`${this.settings.apiBaseUrl()}/produktbereiche`).pipe(retry(1));
    }

    public read(id: number) {
        return this.http.get<Produktbereich>(`${this.settings.apiBaseUrl()}/produktbereiche/${id}`).pipe(retry(1));
    }

    public update(produktbereiche: Produktbereich) {
        return this.http.put<Produktbereich>(`${this.settings.apiBaseUrl()}/produktbereiche/${produktbereiche.id}`, produktbereiche).pipe(retry(1));
    }

    public delete(id: number) {
        return this.http.delete<boolean>(`${this.settings.apiBaseUrl()}/produktbereiche/${id}`).pipe(retry(1));
    }
}
