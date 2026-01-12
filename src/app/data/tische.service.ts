import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Tisch } from 'src/app/model/tisch.class';
import { SettingsService } from './settings.service';

@Injectable({
    providedIn: 'root',
})
export class TischeService {
    private http = inject(HttpClient);
    private settings = inject(SettingsService);

    public create(tische: Tisch) {
        return this.http.post<Tisch>(`${this.settings.apiBaseUrl()}/tische`, tische);
    }

    public readAll(): Observable<Tisch[]> {
        return this.http.get<Tisch[]>(`${this.settings.apiBaseUrl()}/tische`);
    }

    public read(id: number) {
        return this.http.get<Tisch>(`${this.settings.apiBaseUrl()}/tische/${id}`);
    }

    public update(tische: Tisch) {
        return this.http.put<Tisch>(`${this.settings.apiBaseUrl()}/tische/${tische.id}`, tische);
    }

    public delete(id: number) {
        return this.http.delete<boolean>(`${this.settings.apiBaseUrl()}/tische/${id}`);
    }
}
