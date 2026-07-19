import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProduktDto } from '../../model/dto/produkt.dto';
import { SettingsService } from '../settings.service';

@Injectable({
    providedIn: 'root',
})
export class ProdukteApiService {
    private readonly http = inject(HttpClient);
    private readonly settings = inject(SettingsService);

    public create(produkte: ProduktDto) {
        return this.http.post<ProduktDto>(`${this.settings.apiBaseUrl()}/produkte`, produkte);
    }

    public readAll(): Observable<ProduktDto[]> {
        return this.http.get<ProduktDto[]>(`${this.settings.apiBaseUrl()}/produkte`);
    }

    public read(id: ProduktId) {
        return this.http.get<ProduktDto>(`${this.settings.apiBaseUrl()}/produkte/${id}`);
    }

    public update(produkte: ProduktDto) {
        return this.http.put<ProduktDto>(`${this.settings.apiBaseUrl()}/produkte/${produkte.id}`, produkte);
    }

    public delete(id: ProduktId) {
        return this.http.delete<boolean>(`${this.settings.apiBaseUrl()}/produkte/${id}`);
    }
}
