import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map, retry, tap } from 'rxjs/operators';
import { IDaten } from 'src/app/model/daten.interface';
import { environment } from 'src/environments/environment';
import { FrontendService } from '../frontend.service';

@Injectable({
    providedIn: 'root',
})
export class CoresApiService {
    private http = inject(HttpClient);
    public frontend = inject(FrontendService);

    public url: string = null;
    private headers: HttpHeaders = null;

    constructor() {
        this.url = environment.api;
    }

    public getCurrentVersion(): Observable<number> {
        // this.frontend.showLoadingSpinner('Vergleiche aktuelle Datenversion');
        return this.http.get<IDaten>(`${this.url}/daten/latest`, { headers: this.headers }).pipe(
            retry(1),
            tap(() => this.frontend.hideLoadingSpinner()),
            map((data: IDaten) => data.version),
        );
    }

    public getDaten() {
        // this.frontend.showLoadingSpinner('Lade neueste Daten');
        return this.http.get<IDaten>(`${this.url}/daten/latest`, { headers: this.headers }).pipe(
            retry(1),
            tap(() => this.frontend.hideLoadingSpinner()),
        );
    }

    public getSystemstatus() {
        // this.frontend.showLoadingSpinner('Empfange Systemstatus');
        return this.http.get(`${this.url}/status/systemstatus`, { headers: this.headers }).pipe(
            retry(1),
            tap(() => this.frontend.hideLoadingSpinner()),
        );
    }
}
