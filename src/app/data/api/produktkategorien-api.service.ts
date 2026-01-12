import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduktkategorie } from 'src/app/model/i-produktkategorie.interface';
import { SettingsService } from '../settings.service';

@Injectable({
    providedIn: 'root',
})
export class ProduktkategorienApiService {
    private readonly http = inject(HttpClient);
    private readonly settings = inject(SettingsService);

    public create(produktkategorien: IProduktkategorie) {
        return this.http.post<IProduktkategorie>(`${this.settings.apiBaseUrl()}/produktkategorien`, produktkategorien);
    }

    public readAll(): Observable<IProduktkategorie[]> {
        return this.http.get<IProduktkategorie[]>(`${this.settings.apiBaseUrl()}/produktkategorien`);
    }

    public read(id: number) {
        return this.http.get<IProduktkategorie>(`${this.settings.apiBaseUrl()}/produktkategorien/${id}`);
    }

    public update(produktkategorien: IProduktkategorie) {
        return this.http.put<IProduktkategorie>(`${this.settings.apiBaseUrl()}/produktkategorien/${produktkategorien.id}`, produktkategorien);
    }

    public delete(id: number) {
        return this.http.delete<boolean>(`${this.settings.apiBaseUrl()}/produktkategorien/${id}`);
    }
}
