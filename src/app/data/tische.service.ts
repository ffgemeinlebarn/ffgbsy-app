import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { Tisch } from 'src/app/model/tisch.class';
import { SettingsService } from './settings.service';

@Injectable({
    providedIn: 'root',
})
export class TischeService {
    private http = inject(HttpClient);
    private settings = inject(SettingsService);

    public create(tische: Tisch) {
        return this.http.post<Tisch>(`${this.settings.apiBaseUrl()}/tische`, tische).pipe(retry(1));
    }

    public readAll(): Observable<Tisch[]> {
        return this.http.get<Tisch[]>(`${this.settings.apiBaseUrl()}/tische`).pipe(retry(1));
    }

    public read(id: number) {
        return this.http.get<Tisch>(`${this.settings.apiBaseUrl()}/tische/${id}`).pipe(retry(1));
    }

    public update(tische: Tisch) {
        return this.http.put<Tisch>(`${this.settings.apiBaseUrl()}/tische/${tische.id}`, tische).pipe(retry(1));
    }

    public delete(id: number) {
        return this.http.delete<boolean>(`${this.settings.apiBaseUrl()}/tische/${id}`).pipe(retry(1));
    }
}
