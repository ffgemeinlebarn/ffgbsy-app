import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AufnehmerDto } from '../../model/dto/aufnehmer.dto';
import { SettingsService } from '../settings.service';

@Injectable({
    providedIn: 'root',
})
export class AufnehmerApiService {
    private readonly http = inject(HttpClient);
    private readonly settings = inject(SettingsService);

    public create(aufnehmer: AufnehmerDto) {
        return this.http.post<AufnehmerDto>(`${this.settings.apiBaseUrl()}/aufnehmer`, aufnehmer);
    }

    public readAll(): Observable<AufnehmerDto[]> {
        return this.http.get<AufnehmerDto[]>(`${this.settings.apiBaseUrl()}/aufnehmer`);
    }

    public read(id: number) {
        return this.http.get<AufnehmerDto>(`${this.settings.apiBaseUrl()}/aufnehmer/${id}`);
    }

    public update(aufnehmer: AufnehmerDto) {
        return this.http.put<AufnehmerDto>(`${this.settings.apiBaseUrl()}/aufnehmer/${aufnehmer.id}`, aufnehmer);
    }

    public delete(id: number) {
        return this.http.delete<boolean>(`${this.settings.apiBaseUrl()}/aufnehmer/${id}`);
    }
}
