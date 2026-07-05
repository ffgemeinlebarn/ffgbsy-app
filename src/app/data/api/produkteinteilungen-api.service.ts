import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProdukteinteilungDto } from '../../model/dto/produkteinteilung.dto';
import { SettingsService } from '../settings.service';

@Injectable({
    providedIn: 'root',
})
export class ProdukteinteilungenApiService {
    private readonly http = inject(HttpClient);
    private readonly settings = inject(SettingsService);

    public create(produkteinteilungen: ProdukteinteilungDto) {
        return this.http.post<ProdukteinteilungDto>(`${this.settings.apiBaseUrl()}/produkteinteilungen`, produkteinteilungen);
    }

    public readAll(): Observable<ProdukteinteilungDto[]> {
        return this.http.get<ProdukteinteilungDto[]>(`${this.settings.apiBaseUrl()}/produkteinteilungen`);
    }

    public read(id: ProdukteinteilungId) {
        return this.http.get<ProdukteinteilungDto>(`${this.settings.apiBaseUrl()}/produkteinteilungen/${id}`);
    }

    public update(produkteinteilungen: ProdukteinteilungDto) {
        return this.http.put<ProdukteinteilungDto>(`${this.settings.apiBaseUrl()}/produkteinteilungen/${produkteinteilungen.id}`, produkteinteilungen);
    }

    public delete(id: ProdukteinteilungId) {
        return this.http.delete<boolean>(`${this.settings.apiBaseUrl()}/produkteinteilungen/${id}`);
    }
}
