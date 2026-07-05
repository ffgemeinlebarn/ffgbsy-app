import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProduktDto } from '../../model/dto/produktkategorie.dto';
import { SettingsService } from '../settings.service';

@Injectable({
    providedIn: 'root',
})
export class ProduktkategorienApiService {
    private readonly http = inject(HttpClient);
    private readonly settings = inject(SettingsService);

    public create(produktkategorien: ProduktDto) {
        return this.http.post<ProduktDto>(`${this.settings.apiBaseUrl()}/produktkategorien`, produktkategorien);
    }

    public readAll(): Observable<ProduktDto[]> {
        return this.http.get<ProduktDto[]>(`${this.settings.apiBaseUrl()}/produktkategorien`);
    }

    public read(id: number) {
        return this.http.get<ProduktDto>(`${this.settings.apiBaseUrl()}/produktkategorien/${id}`);
    }

    public update(produktkategorien: ProduktDto) {
        return this.http.put<ProduktDto>(`${this.settings.apiBaseUrl()}/produktkategorien/${produktkategorien.id}`, produktkategorien);
    }

    public delete(id: number) {
        return this.http.delete<boolean>(`${this.settings.apiBaseUrl()}/produktkategorien/${id}`);
    }
}
