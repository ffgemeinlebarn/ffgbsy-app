import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { Produkt } from 'src/app/model/produkt.class';
import { SettingsService } from './settings.service';

@Injectable({
    providedIn: 'root',
})
export class ProdukteService {
    http = inject(HttpClient);
    settings = inject(SettingsService);

    public create(produkte: Produkt) {
        return this.http.post<Produkt>(`${this.settings.apiBaseUrl()}/produkte`, produkte).pipe(retry(1));
    }

    public readAll(): Observable<Produkt[]> {
        return this.http.get<Produkt[]>(`${this.settings.apiBaseUrl()}/produkte`).pipe(retry(1));
    }

    public read(id: number) {
        return this.http.get<Produkt>(`${this.settings.apiBaseUrl()}/produkte/${id}`).pipe(retry(1));
    }

    public update(produkte: Produkt) {
        return this.http.put<Produkt>(`${this.settings.apiBaseUrl()}/produkte/${produkte.id}`, produkte).pipe(retry(1));
    }

    public delete(id: number) {
        return this.http.delete<boolean>(`${this.settings.apiBaseUrl()}/produkte/${id}`).pipe(retry(1));
    }
}
