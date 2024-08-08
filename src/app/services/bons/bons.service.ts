import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, retry } from 'rxjs';
import { Bestellposition } from 'src/app/classes/bestellposition.model';
import { Bon } from 'src/app/classes/bon.model';
import { BonDruck } from 'src/app/classes/bonDruck';
import { IBonsFilter } from 'src/app/interfaces/bons-filter.interface';
import { ErrorHandlingService } from '../error-handling/error-handling.service';
import { SettingsService } from '../settings/settings.service';

@Injectable({
    providedIn: 'root'
})
export class BonsService {
    private http = inject(HttpClient);
    private settings = inject(SettingsService);
    private errorHandling = inject(ErrorHandlingService);

    public createStornoBon(bestellposition: Bestellposition): Observable<Bon> {
        return this.http
            .post(`${this.settings.apiBaseUrl()}/bons`, {
                type: "storno",
                bestellungen_id: bestellposition.bestellungen_id,
                drucker_id: bestellposition.drucker_id,
                bestellpositionen: [bestellposition]
            },)
            .pipe(
                retry(1),
                catchError((error) => this.errorHandling.globalApiErrorHandling(error))
            );
    }

    public search(filter: IBonsFilter): Observable<Bon[]> {
        let params = new HttpParams();

        if (filter.druckerId) {
            params = params.append("druckerId", filter.druckerId);
        }
        if (filter.tischId) {
            params = params.append("tischId", filter.tischId);
        }
        if (filter.type) {
            params = params.append("type", filter.type);
        }

        params = params.append("missingSuccessfulDruck", filter.missingSuccessfulDruck);
        params = params.append("multipleDrucke", filter.multipleDrucke);
        params = params.append("limit", filter.limit);

        return this.http
            .get<Bon[]>(`${this.settings.apiBaseUrl()}/bons`, { params })
            .pipe(
                retry(1),
                catchError((error) => this.errorHandling.globalApiErrorHandling(error))
            );
    }

    public druckBons(bons: BonDruck[]): Observable<BonDruck[]> {
        return this.http
            .post(`${this.settings.apiBaseUrl()}/bons/druck`, bons)
            .pipe(
                retry(1),
                catchError((error) => this.errorHandling.globalApiErrorHandling(error))
            );
    }

    public druckBonsByIds(bonIds: number[]): Observable<BonDruck[]> {
        return this.http
            .post(`${this.settings.apiBaseUrl()}/print/bons`, bonIds)
            .pipe(
                retry(1),
                catchError((error) => this.errorHandling.globalApiErrorHandling(error))
            );
    }

    public druckBon(bon: Bon): Observable<BonDruck> {
        return this.http
            .post(`${this.settings.apiBaseUrl()}/bons/${bon.id}/druck`, bon)
            .pipe(
                retry(1),
                catchError((error) => this.errorHandling.globalApiErrorHandling(error))
            );
    }
}
