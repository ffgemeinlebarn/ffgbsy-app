import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TischkategorieDto } from '../../model/dto/tischkategorie.dto';
import { SettingsService } from '../settings.service';

@Injectable({
    providedIn: 'root',
})
export class TischkategorienApiService {
    private readonly http = inject(HttpClient);
    private readonly settings = inject(SettingsService);

    public create(tischkategorien: TischkategorieDto) {
        return this.http.post<TischkategorieDto>(`${this.settings.apiBaseUrl()}/tischkategorien`, tischkategorien);
    }

    public readAll(): Observable<TischkategorieDto[]> {
        return this.http.get<TischkategorieDto[]>(`${this.settings.apiBaseUrl()}/tischkategorien`);
    }

    public readAllNested(): Observable<TischkategorieDto[]> {
        return this.http.get<TischkategorieDto[]>(`${this.settings.apiBaseUrl()}/tischkategorien`, { params: { nested: true } });
    }

    public read(id: TischkategorieId, nested = false) {
        return this.http.get<TischkategorieDto>(`${this.settings.apiBaseUrl()}/tischkategorien/${id}`, { params: nested ? { nested: true } : undefined });
    }

    public update(tischkategorien: TischkategorieDto) {
        return this.http.put<TischkategorieDto>(`${this.settings.apiBaseUrl()}/tischkategorien/${tischkategorien.id}`, tischkategorien);
    }

    public delete(id: TischkategorieId) {
        return this.http.delete<boolean>(`${this.settings.apiBaseUrl()}/tischkategorien/${id}`);
    }
}
