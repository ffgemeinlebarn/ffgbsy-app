import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProduktbereichDto } from '../../model/dto/produktbereich.dto';
import { SettingsService } from '../settings.service';

@Injectable({
    providedIn: 'root',
})
export class ProduktbereicheApiService {
    private readonly http = inject(HttpClient);
    private readonly settings = inject(SettingsService);

    public create(produktbereiche: ProduktbereichDto) {
        return this.http.post<ProduktbereichDto>(`${this.settings.apiBaseUrl()}/produktbereiche`, produktbereiche);
    }

    public readAll(): Observable<ProduktbereichDto[]> {
        return this.http.get<ProduktbereichDto[]>(`${this.settings.apiBaseUrl()}/produktbereiche`);
    }

    public read(id: ProduktbereichId) {
        return this.http.get<ProduktbereichDto>(`${this.settings.apiBaseUrl()}/produktbereiche/${id}`);
    }

    public update(produktbereiche: ProduktbereichDto) {
        return this.http.put<ProduktbereichDto>(`${this.settings.apiBaseUrl()}/produktbereiche/${produktbereiche.id}`, produktbereiche);
    }

    public delete(id: ProduktbereichId) {
        return this.http.delete<boolean>(`${this.settings.apiBaseUrl()}/produktbereiche/${id}`);
    }
}
