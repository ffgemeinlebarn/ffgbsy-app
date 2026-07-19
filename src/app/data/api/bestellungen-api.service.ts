import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BestellpositionDto } from '../../model/dto/bestellposition.dto';
import { BestellungDto } from '../../model/dto/bestellung.dto';
import { IBestellungenFilter } from '../../model/interfaces/i-bestellungen-filter.interface';
import { SettingsService } from '../settings.service';

@Injectable({
    providedIn: 'root',
})
export class BestellungenApiService {
    private readonly http = inject(HttpClient);
    private readonly settings = inject(SettingsService);

    public checkAvailability(bestellung: BestellungDto) {
        return this.http.post<any>(`${this.settings.apiBaseUrl()}/bestellungen/availability`, bestellung);
    }

    public create(bestellung: BestellungDto) {
        return this.http.post<BestellungDto>(`${this.settings.apiBaseUrl()}/bestellungen`, bestellung);
    }

    public createStornoBestellposition(bestellposition: BestellpositionDto, anzahl: number) {
        return this.http.post<BestellpositionDto>(`${this.settings.apiBaseUrl()}/bestellungen/${bestellposition.bestellungen_id}/bestellpositionen/${bestellposition.id}`, { anzahl });
    }

    public readAll() {
        return this.http.get<BestellungDto[]>(`${this.settings.apiBaseUrl()}/bestellungen`);
    }

    public read(id: BestellungId) {
        return this.http.get<BestellungDto>(`${this.settings.apiBaseUrl()}/bestellungen/${id}`);
    }

    public search(filter: IBestellungenFilter) {
        let params = new HttpParams();

        if (filter.aufnehmerId) {
            params = params.append('aufnehmerId', filter.aufnehmerId);
        }
        if (filter.tischId) {
            params = params.append('tischId', filter.tischId);
        }

        params = params.append('limit', filter.limit);

        return this.http.get<BestellungDto[]>(`${this.settings.apiBaseUrl()}/bestellungen`, {
            params,
        });
    }

    public update(bestellungen: BestellungDto) {
        return this.http.put<BestellungDto>(`${this.settings.apiBaseUrl()}/bestellungen/${bestellungen.id}`, bestellungen);
    }

    public delete(id: BestellungId) {
        return this.http.delete<boolean>(`${this.settings.apiBaseUrl()}/bestellungen/${id}`);
    }
}
