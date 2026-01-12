import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IDaten } from 'src/app/model/daten.interface';
import { SettingsService } from '../settings.service';

@Injectable({
    providedIn: 'root',
})
export class CoresApiService {
    private readonly http = inject(HttpClient);
    private readonly settings = inject(SettingsService);

    public getCurrentVersion(): Observable<number> {
        return this.http.get<IDaten>(`${this.settings.apiBaseUrl()}/daten/latest`).pipe(map((data: IDaten) => data.version));
    }

    public getDaten() {
        return this.http.get<IDaten>(`${this.settings.apiBaseUrl()}/daten/latest`);
    }

    public getSystemstatus() {
        return this.http.get(`${this.settings.apiBaseUrl()}/status/systemstatus`);
    }
}
