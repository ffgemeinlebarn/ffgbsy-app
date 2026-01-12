import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Produkt } from 'src/app/model/produkt.class';
import { SettingsService } from './settings.service';

@Injectable({
    providedIn: 'root',
})
export class ProdukteService {
    http = inject(HttpClient);
    settings = inject(SettingsService);

    public create(produkte: Produkt) {
        return this.http.post<Produkt>(`${this.settings.apiBaseUrl()}/produkte`, produkte);
    }

    public readAll(): Observable<Produkt[]> {
        return this.http.get<Produkt[]>(`${this.settings.apiBaseUrl()}/produkte`);
    }

    public read(id: number) {
        return this.http.get<Produkt>(`${this.settings.apiBaseUrl()}/produkte/${id}`);
    }

    public update(produkte: Produkt) {
        return this.http.put<Produkt>(`${this.settings.apiBaseUrl()}/produkte/${produkte.id}`, produkte);
    }

    public delete(id: number) {
        return this.http.delete<boolean>(`${this.settings.apiBaseUrl()}/produkte/${id}`);
    }
}
