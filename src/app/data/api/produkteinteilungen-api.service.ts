import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produkteinteilung } from 'src/app/model/produkteinteilung.class';
import { SettingsService } from '../settings.service';

@Injectable({
    providedIn: 'root',
})
export class ProdukteinteilungenApiService {
    private readonly http = inject(HttpClient);
    private readonly settings = inject(SettingsService);

    public create(produkteinteilungen: Produkteinteilung) {
        return this.http.post<Produkteinteilung>(`${this.settings.apiBaseUrl()}/produkteinteilungen`, produkteinteilungen);
    }

    public readAll(): Observable<Produkteinteilung[]> {
        return this.http.get<Produkteinteilung[]>(`${this.settings.apiBaseUrl()}/produkteinteilungen`);
    }

    public read(id: number) {
        return this.http.get<Produkteinteilung>(`${this.settings.apiBaseUrl()}/produkteinteilungen/${id}`);
    }

    public update(produkteinteilungen: Produkteinteilung) {
        return this.http.put<Produkteinteilung>(`${this.settings.apiBaseUrl()}/produkteinteilungen/${produkteinteilungen.id}`, produkteinteilungen);
    }

    public delete(id: number) {
        return this.http.delete<boolean>(`${this.settings.apiBaseUrl()}/produkteinteilungen/${id}`);
    }
}
