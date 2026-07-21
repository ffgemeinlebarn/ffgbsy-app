import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonDto } from '../../model/dto/aufnehmer.dto';
import { SettingsService } from '../settings.service';

@Injectable({
    providedIn: 'root',
})
export class PersonenApiService {
    private readonly http = inject(HttpClient);
    private readonly settings = inject(SettingsService);

    public create(aufnehmer: PersonDto) {
        return this.http.post<PersonDto>(`${this.settings.apiBaseUrl()}/aufnehmer`, aufnehmer);
    }

    public readAll(): Observable<PersonDto[]> {
        return this.http.get<PersonDto[]>(`${this.settings.apiBaseUrl()}/aufnehmer`);
    }

    public read(id: PersonId) {
        return this.http.get<PersonDto>(`${this.settings.apiBaseUrl()}/aufnehmer/${id}`);
    }

    public update(aufnehmer: PersonDto) {
        return this.http.put<PersonDto>(`${this.settings.apiBaseUrl()}/aufnehmer/${aufnehmer.id}`, aufnehmer);
    }

    public delete(id: PersonId) {
        return this.http.delete<boolean>(`${this.settings.apiBaseUrl()}/aufnehmer/${id}`);
    }
}
