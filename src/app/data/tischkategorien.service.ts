import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { Tischkategorie } from 'src/app/model/tischkategorie.class';
import { SettingsService } from './settings.service';

@Injectable({
    providedIn: 'root',
})
export class TischkategorienService {
    http = inject(HttpClient);
    settings = inject(SettingsService);

    public create(tischkategorien: Tischkategorie) {
        return this.http.post<Tischkategorie>(`${this.settings.apiBaseUrl()}/tischkategorien`, tischkategorien).pipe(retry(1));
    }

    public readAll(): Observable<Tischkategorie[]> {
        return this.http.get<Tischkategorie[]>(`${this.settings.apiBaseUrl()}/tischkategorien`).pipe(retry(1));
    }

    public readAllNested(): Observable<Tischkategorie[]> {
        return this.http.get<Tischkategorie[]>(`${this.settings.apiBaseUrl()}/tischkategorien`, { params: { nested: true } }).pipe(retry(1));
    }

    public read(id: number, nested = false) {
        return this.http.get<Tischkategorie>(`${this.settings.apiBaseUrl()}/tischkategorien/${id}`, { params: nested ? { nested: true } : undefined }).pipe(retry(1));
    }

    public update(tischkategorien: Tischkategorie) {
        return this.http.put<Tischkategorie>(`${this.settings.apiBaseUrl()}/tischkategorien/${tischkategorien.id}`, tischkategorien).pipe(retry(1));
    }

    public delete(id: number) {
        return this.http.delete<boolean>(`${this.settings.apiBaseUrl()}/tischkategorien/${id}`).pipe(retry(1));
    }
}
