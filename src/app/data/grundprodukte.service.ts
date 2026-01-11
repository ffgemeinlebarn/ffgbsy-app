import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, Observable, retry } from 'rxjs';
import { IGrundprodukt } from 'src/app/model/i-grundprodukt.class';
import { ErrorHandlingService } from './error-handling.service';
import { SettingsService } from './settings.service';

@Injectable({
    providedIn: 'root',
})
export class GrundprodukteService {
    private http = inject(HttpClient);
    private settings = inject(SettingsService);
    private errorHandling = inject(ErrorHandlingService);

    public items = toSignal(this.readAll());

    public create(grundprodukt: IGrundprodukt) {
        return this.http.post<IGrundprodukt>(`${this.settings.apiBaseUrl()}/grundprodukte`, grundprodukt).pipe(
            retry(1),
            catchError((error) => this.errorHandling.globalApiErrorHandling(error)),
        );
    }

    public readAll(): Observable<IGrundprodukt[]> {
        return this.http.get<IGrundprodukt[]>(`${this.settings.apiBaseUrl()}/grundprodukte`).pipe(
            retry(1),
            catchError((error) => this.errorHandling.globalApiErrorHandling(error)),
        );
    }

    public read(id: number) {
        return this.http.get<IGrundprodukt>(`${this.settings.apiBaseUrl()}/grundprodukte/${id}`).pipe(
            retry(1),
            catchError((error) => this.errorHandling.globalApiErrorHandling(error)),
        );
    }

    public update(grundprodukt: IGrundprodukt) {
        return this.http.put<IGrundprodukt>(`${this.settings.apiBaseUrl()}/grundprodukte/${grundprodukt.id}`, grundprodukt).pipe(
            retry(1),
            catchError((error) => this.errorHandling.globalApiErrorHandling(error)),
        );
    }

    public delete(id: number) {
        return this.http.delete<boolean>(`${this.settings.apiBaseUrl()}/grundprodukte/${id}`).pipe(
            retry(1),
            catchError((error) => this.errorHandling.globalApiErrorHandling(error)),
        );
    }
}
