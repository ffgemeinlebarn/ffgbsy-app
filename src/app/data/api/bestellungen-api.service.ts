import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Bestellposition } from 'src/app/model/bestellposition.model';
import { Bestellung } from 'src/app/model/bestellung.model';
import { IBestellungenFilter } from 'src/app/model/i-bestellungen-filter.interface';
import { SettingsService } from '../settings.service';

@Injectable({
    providedIn: 'root',
})
export class BestellungenApiService {
    private readonly http = inject(HttpClient);
    private readonly settings = inject(SettingsService);

    public checkAvailability(bestellung: Bestellung) {
        return this.http.post<any>(`${this.settings.apiBaseUrl()}/bestellungen/availability`, bestellung);
    }

    public create(bestellung: Bestellung) {
        return this.http.post<Bestellung>(`${this.settings.apiBaseUrl()}/bestellungen`, bestellung);
    }

    public createStornoBestellposition(bestellposition: Bestellposition, anzahl: number) {
        return this.http.post<Bestellposition>(`${this.settings.apiBaseUrl()}/bestellungen/${bestellposition.bestellungen_id}/bestellpositionen/${bestellposition.id}`, { anzahl });
    }

    public readAll() {
        return this.http.get<Bestellung[]>(`${this.settings.apiBaseUrl()}/bestellungen`);
    }

    public read(id: number) {
        return this.http.get<Bestellung>(`${this.settings.apiBaseUrl()}/bestellungen/${id}`);
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

        return this.http.get<Bestellung[]>(`${this.settings.apiBaseUrl()}/bestellungen`, {
            params,
        });
    }

    public update(bestellungen: Bestellung) {
        return this.http.put<Bestellung>(`${this.settings.apiBaseUrl()}/bestellungen/${bestellungen.id}`, bestellungen);
    }

    public delete(id: number) {
        return this.http.delete<boolean>(`${this.settings.apiBaseUrl()}/bestellungen/${id}`);
    }
}
