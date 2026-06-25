import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduktbereich } from '../../model/i-produktbereich.interface';
import { SettingsService } from '../settings.service';

@Injectable({
    providedIn: 'root',
})
export class ProduktbereicheApiService {
    private readonly http = inject(HttpClient);
    private readonly settings = inject(SettingsService);

    public create(produktbereiche: IProduktbereich) {
        return this.http.post<IProduktbereich>(`${this.settings.apiBaseUrl()}/produktbereiche`, produktbereiche);
    }

    public readAll(): Observable<IProduktbereich[]> {
        return this.http.get<IProduktbereich[]>(`${this.settings.apiBaseUrl()}/produktbereiche`);
    }

    public read(id: number) {
        return this.http.get<IProduktbereich>(`${this.settings.apiBaseUrl()}/produktbereiche/${id}`);
    }

    public update(produktbereiche: IProduktbereich) {
        return this.http.put<IProduktbereich>(`${this.settings.apiBaseUrl()}/produktbereiche/${produktbereiche.id}`, produktbereiche);
    }

    public delete(id: number) {
        return this.http.delete<boolean>(`${this.settings.apiBaseUrl()}/produktbereiche/${id}`);
    }
}
