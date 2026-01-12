import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Produktbereich } from 'src/app/model/produktbereich.class';
import { SettingsService } from '../settings.service';

@Injectable({
    providedIn: 'root',
})
export class ProduktbereicheApiService {
    private readonly http = inject(HttpClient);
    private readonly settings = inject(SettingsService);

    public create(produktbereiche: Produktbereich) {
        return this.http.post<Produktbereich>(`${this.settings.apiBaseUrl()}/produktbereiche`, produktbereiche);
    }

    public readAll(): Observable<Produktbereich[]> {
        return this.http.get<Produktbereich[]>(`${this.settings.apiBaseUrl()}/produktbereiche`);
    }

    public read(id: number) {
        return this.http.get<Produktbereich>(`${this.settings.apiBaseUrl()}/produktbereiche/${id}`);
    }

    public update(produktbereiche: Produktbereich) {
        return this.http.put<Produktbereich>(`${this.settings.apiBaseUrl()}/produktbereiche/${produktbereiche.id}`, produktbereiche);
    }

    public delete(id: number) {
        return this.http.delete<boolean>(`${this.settings.apiBaseUrl()}/produktbereiche/${id}`);
    }
}
