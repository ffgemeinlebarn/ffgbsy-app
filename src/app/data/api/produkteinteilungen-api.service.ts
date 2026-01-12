import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProdukteinteilung } from 'src/app/model/i-produkteinteilung.interface';
import { SettingsService } from '../settings.service';

@Injectable({
    providedIn: 'root',
})
export class ProdukteinteilungenApiService {
    private readonly http = inject(HttpClient);
    private readonly settings = inject(SettingsService);

    public create(produkteinteilungen: IProdukteinteilung) {
        return this.http.post<IProdukteinteilung>(`${this.settings.apiBaseUrl()}/produkteinteilungen`, produkteinteilungen);
    }

    public readAll(): Observable<IProdukteinteilung[]> {
        return this.http.get<IProdukteinteilung[]>(`${this.settings.apiBaseUrl()}/produkteinteilungen`);
    }

    public read(id: number) {
        return this.http.get<IProdukteinteilung>(`${this.settings.apiBaseUrl()}/produkteinteilungen/${id}`);
    }

    public update(produkteinteilungen: IProdukteinteilung) {
        return this.http.put<IProdukteinteilung>(`${this.settings.apiBaseUrl()}/produkteinteilungen/${produkteinteilungen.id}`, produkteinteilungen);
    }

    public delete(id: number) {
        return this.http.delete<boolean>(`${this.settings.apiBaseUrl()}/produkteinteilungen/${id}`);
    }
}
