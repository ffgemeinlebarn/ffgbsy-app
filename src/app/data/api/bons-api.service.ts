import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BestellpositionDto } from '../../model/dto/bestellposition.dto';
import { BonDruckDto } from '../../model/dto/bon-druck.dto';
import { BonDto } from '../../model/dto/bon.dto';
import { IBonsFilter } from '../../model/interfaces/i-bons-filter.interface';
import { SettingsService } from '../settings.service';

@Injectable({
    providedIn: 'root',
})
export class BonsApiService {
    private readonly http = inject(HttpClient);
    private readonly settings = inject(SettingsService);

    public createStornoBon(bestellposition: BestellpositionDto) {
        return this.http.post<BonDto>(`${this.settings.apiBaseUrl()}/bons`, {
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

        return this.http.get<BonDto[]>(`${this.settings.apiBaseUrl()}/bons`, { params });
    }

    public druckBonsOfBestellungById(id: number): Observable<BonDruckDto[]> {
        return this.http.post<BonDruckDto[]>(`${this.settings.apiBaseUrl()}/print/bestellungen/${id}`, null);
    }

    public druckBonsByIds(ids: number[]): Observable<BonDruckDto[]> {
        return this.http.post<BonDruckDto[]>(`${this.settings.apiBaseUrl()}/print/bons`, ids);
    }

    public druckBonById(id: number): Observable<BonDruckDto> {
        return this.http.post<BonDruckDto>(`${this.settings.apiBaseUrl()}/print/bons/${id}`, null);
    }
}
