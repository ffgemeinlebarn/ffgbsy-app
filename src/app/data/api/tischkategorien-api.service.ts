import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ITischkategorie } from '../../model/i-tischkategorie.interface';
import { SettingsService } from '../settings.service';

@Injectable({
    providedIn: 'root',
})
export class TischkategorienApiService {
    private readonly http = inject(HttpClient);
    private readonly settings = inject(SettingsService);

    public create(tischkategorien: ITischkategorie) {
        return this.http.post<ITischkategorie>(`${this.settings.apiBaseUrl()}/tischkategorien`, tischkategorien);
    }

    public readAll(): Observable<ITischkategorie[]> {
        return this.http.get<ITischkategorie[]>(`${this.settings.apiBaseUrl()}/tischkategorien`);
    }

    public readAllNested(): Observable<ITischkategorie[]> {
        return this.http.get<ITischkategorie[]>(`${this.settings.apiBaseUrl()}/tischkategorien`, { params: { nested: true } });
    }

    public read(id: number, nested = false) {
        return this.http.get<ITischkategorie>(`${this.settings.apiBaseUrl()}/tischkategorien/${id}`, { params: nested ? { nested: true } : undefined });
    }

    public update(tischkategorien: ITischkategorie) {
        return this.http.put<ITischkategorie>(`${this.settings.apiBaseUrl()}/tischkategorien/${tischkategorien.id}`, tischkategorien);
    }

    public delete(id: number) {
        return this.http.delete<boolean>(`${this.settings.apiBaseUrl()}/tischkategorien/${id}`);
    }
}
