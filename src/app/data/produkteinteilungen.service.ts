import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { Produkteinteilung } from 'src/app/model/produkteinteilung.class';
import { SettingsService } from './settings.service';

@Injectable({
    providedIn: 'root',
})
export class ProdukteinteilungenService {
    http = inject(HttpClient);
    settings = inject(SettingsService);

    public create(produkteinteilungen: Produkteinteilung) {
        return this.http.post<Produkteinteilung>(`${this.settings.apiBaseUrl()}/produkteinteilungen`, produkteinteilungen).pipe(retry(1));
    }

    public readAll(): Observable<Produkteinteilung[]> {
        return this.http.get<Produkteinteilung[]>(`${this.settings.apiBaseUrl()}/produkteinteilungen`).pipe(retry(1));
    }

    public read(id: number) {
        return this.http.get<Produkteinteilung>(`${this.settings.apiBaseUrl()}/produkteinteilungen/${id}`).pipe(retry(1));
    }

    public update(produkteinteilungen: Produkteinteilung) {
        return this.http.put<Produkteinteilung>(`${this.settings.apiBaseUrl()}/produkteinteilungen/${produkteinteilungen.id}`, produkteinteilungen).pipe(retry(1));
    }

    public delete(id: number) {
        return this.http.delete<boolean>(`${this.settings.apiBaseUrl()}/produkteinteilungen/${id}`).pipe(retry(1));
    }
}
