import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonDto } from '../../model/dto/person.dto';
import { SettingsService } from '../settings.service';

@Injectable({
    providedIn: 'root',
})
export class PersonenApiService {
    private readonly http = inject(HttpClient);
    private readonly settings = inject(SettingsService);

    public create(person: PersonDto) {
        return this.http.post<PersonDto>(`${this.settings.apiBaseUrl()}/personen`, person);
    }

    public readAll(): Observable<PersonDto[]> {
        return this.http.get<PersonDto[]>(`${this.settings.apiBaseUrl()}/personen`);
    }

    public read(id: PersonId) {
        return this.http.get<PersonDto>(`${this.settings.apiBaseUrl()}/personen/${id}`);
    }

    public update(person: PersonDto) {
        return this.http.put<PersonDto>(`${this.settings.apiBaseUrl()}/personen/${person.id}`, person);
    }

    public delete(id: PersonId) {
        return this.http.delete<boolean>(`${this.settings.apiBaseUrl()}/personen/${id}`);
    }
}
