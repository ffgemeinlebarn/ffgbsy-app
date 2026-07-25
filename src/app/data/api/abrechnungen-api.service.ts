import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AbrechnungDto } from '../../model/dto/abrechnung.dto';
import { PersonDto } from '../../model/dto/person.dto';
import { SettingsService } from '../settings.service';

@Injectable({
    providedIn: 'root',
})
export class AbrechnungenApiService {
    private readonly http = inject(HttpClient);
    private readonly settings = inject(SettingsService);

    public create(abrechnung: AbrechnungDto) {
        return of(abrechnung);
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
