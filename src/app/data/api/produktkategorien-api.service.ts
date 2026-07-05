import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProduktkategorieDto } from '../../model/dto/produktkategorie.dto';
import { SettingsService } from '../settings.service';

@Injectable({
    providedIn: 'root',
})
export class ProduktkategorienApiService {
    private readonly http = inject(HttpClient);
    private readonly settings = inject(SettingsService);

    public create(produktkategorien: ProduktkategorieDto) {
        return this.http.post<ProduktkategorieDto>(`${this.settings.apiBaseUrl()}/produktkategorien`, produktkategorien);
    }

    public readAll(): Observable<ProduktkategorieDto[]> {
        return this.http.get<ProduktkategorieDto[]>(`${this.settings.apiBaseUrl()}/produktkategorien`);
    }

    public read(id: ProduktkategorieId) {
        return this.http.get<ProduktkategorieDto>(`${this.settings.apiBaseUrl()}/produktkategorien/${id}`);
    }

    public update(produktkategorien: ProduktkategorieDto) {
        return this.http.put<ProduktkategorieDto>(`${this.settings.apiBaseUrl()}/produktkategorien/${produktkategorien.id}`, produktkategorien);
    }

    public delete(id: ProduktkategorieId) {
        return this.http.delete<boolean>(`${this.settings.apiBaseUrl()}/produktkategorien/${id}`);
    }
}
