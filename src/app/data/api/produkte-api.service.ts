import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IProdukt } from '../../model/i-produkt.interface';
import { SettingsService } from '../settings.service';

@Injectable({
    providedIn: 'root',
})
export class ProdukteApiService {
    private readonly http = inject(HttpClient);
    private readonly settings = inject(SettingsService);

    public create(produkte: IProdukt) {
        return this.http.post<IProdukt>(`${this.settings.apiBaseUrl()}/produkte`, produkte);
    }

    public readAll(): Observable<IProdukt[]> {
        return this.http.get<IProdukt[]>(`${this.settings.apiBaseUrl()}/produkte`);
    }

    public read(id: number) {
        return this.http.get<IProdukt>(`${this.settings.apiBaseUrl()}/produkte/${id}`);
    }

    public update(produkte: IProdukt) {
        return this.http.put<IProdukt>(`${this.settings.apiBaseUrl()}/produkte/${produkte.id}`, produkte);
    }

    public delete(id: number) {
        return this.http.delete<boolean>(`${this.settings.apiBaseUrl()}/produkte/${id}`);
    }
}
