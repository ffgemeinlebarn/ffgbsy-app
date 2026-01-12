import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Bestellposition } from 'src/app/model/bestellposition.model';
import { IBonsFilter } from 'src/app/model/bons-filter.interface';
import { IBonDruck } from 'src/app/model/i-bon-druck';
import { IBon } from 'src/app/model/i-bon.model';
import { SettingsService } from '../settings.service';

@Injectable({
    providedIn: 'root',
})
export class BonsService {
    private readonly http = inject(HttpClient);
    private readonly settings = inject(SettingsService);

    public createStornoBon(bestellposition: Bestellposition) {
        return this.http.post<IBon>(`${this.settings.apiBaseUrl()}/bons`, {
            type: 'storno',
            bestellungen_id: bestellposition.bestellungen_id,
            drucker_id: bestellposition.drucker_id,
            bestellpositionen: [bestellposition],
        });
    }

    public search(filter: IBonsFilter) {
        let params = new HttpParams();

        if (filter.druckerId) {
            params = params.append('druckerId', filter.druckerId);
        }
        if (filter.tischId) {
            params = params.append('tischId', filter.tischId);
        }
        if (filter.type) {
            params = params.append('type', filter.type);
        }

        params = params.append('missingSuccessfulDruck', filter.missingSuccessfulDruck);
        params = params.append('multipleDrucke', filter.multipleDrucke);
        params = params.append('limit', filter.limit);

        return this.http.get<IBon[]>(`${this.settings.apiBaseUrl()}/bons`, { params });
    }

    public druckBonsOfBestellungById(id: number): Observable<IBonDruck[]> {
        return this.http.post<IBonDruck[]>(`${this.settings.apiBaseUrl()}/print/bestellungen/${id}`, null);
    }

    public druckBonsByIds(ids: number[]): Observable<IBonDruck[]> {
        return this.http.post<IBonDruck[]>(`${this.settings.apiBaseUrl()}/print/bons`, ids);
    }

    public druckBonById(id: number): Observable<IBonDruck> {
        return this.http.post<IBonDruck>(`${this.settings.apiBaseUrl()}/print/bons/${id}`, null);
    }
}
