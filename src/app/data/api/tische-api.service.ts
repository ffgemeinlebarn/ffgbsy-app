import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ITisch } from 'src/app/model/i-tisch.interface';
import { SettingsService } from '../settings.service';

@Injectable({
    providedIn: 'root',
})
export class TischeApiService {
    private readonly http = inject(HttpClient);
    private readonly settings = inject(SettingsService);

    public create(tische: ITisch) {
        return this.http.post<ITisch>(`${this.settings.apiBaseUrl()}/tische`, tische);
    }

    public readAll(): Observable<ITisch[]> {
        return this.http.get<ITisch[]>(`${this.settings.apiBaseUrl()}/tische`);
    }

    public read(id: number) {
        return this.http.get<ITisch>(`${this.settings.apiBaseUrl()}/tische/${id}`);
    }

    public update(tische: ITisch) {
        return this.http.put<ITisch>(`${this.settings.apiBaseUrl()}/tische/${tische.id}`, tische);
    }

    public delete(id: number) {
        return this.http.delete<boolean>(`${this.settings.apiBaseUrl()}/tische/${id}`);
    }
}
