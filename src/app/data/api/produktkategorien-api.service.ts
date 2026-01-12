import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Produktkategorie } from 'src/app/model/produktkategorie.class';
import { SettingsService } from '../settings.service';

@Injectable({
    providedIn: 'root',
})
export class ProduktkategorienApiService {
    private readonly http = inject(HttpClient);
    private readonly settings = inject(SettingsService);

    public create(produktkategorien: Produktkategorie) {
        return this.http.post<Produktkategorie>(`${this.settings.apiBaseUrl()}/produktkategorien`, produktkategorien);
    }

    public readAll(): Observable<Produktkategorie[]> {
        return this.http.get<Produktkategorie[]>(`${this.settings.apiBaseUrl()}/produktkategorien`);
    }

    public read(id: number) {
        return this.http.get<Produktkategorie>(`${this.settings.apiBaseUrl()}/produktkategorien/${id}`);
    }

    public update(produktkategorien: Produktkategorie) {
        return this.http.put<Produktkategorie>(`${this.settings.apiBaseUrl()}/produktkategorien/${produktkategorien.id}`, produktkategorien);
    }

    public delete(id: number) {
        return this.http.delete<boolean>(`${this.settings.apiBaseUrl()}/produktkategorien/${id}`);
    }
}
