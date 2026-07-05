import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TischDto } from '../../model/dto/tisch.dto';
import { SettingsService } from '../settings.service';

@Injectable({
    providedIn: 'root',
})
export class TischeApiService {
    private readonly http = inject(HttpClient);
    private readonly settings = inject(SettingsService);

    public create(tische: TischDto) {
        return this.http.post<TischDto>(`${this.settings.apiBaseUrl()}/tische`, tische);
    }

    public readAll(): Observable<TischDto[]> {
        return this.http.get<TischDto[]>(`${this.settings.apiBaseUrl()}/tische`);
    }

    public read(id: number) {
        return this.http.get<TischDto>(`${this.settings.apiBaseUrl()}/tische/${id}`);
    }

    public update(tische: TischDto) {
        return this.http.put<TischDto>(`${this.settings.apiBaseUrl()}/tische/${tische.id}`, tische);
    }

    public delete(id: number) {
        return this.http.delete<boolean>(`${this.settings.apiBaseUrl()}/tische/${id}`);
    }
}
