import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, Observable, retry } from 'rxjs';
import { Grundprodukt } from 'src/app/classes/grundprodukt.class';
import { ErrorHandlingService } from '../error-handling/error-handling.service';
import { SettingsService } from '../settings/settings.service';

@Injectable({
    providedIn: 'root'
})
export class GrundprodukteService {
    private http = inject(HttpClient);
    private settings = inject(SettingsService);
    private errorHandling = inject(ErrorHandlingService);

    public items = toSignal(this.readAll());

    public create(grundprodukt: Grundprodukt) {
        return this.http
            .post<Grundprodukt>(`${this.settings.apiBaseUrl()}/grundprodukte`, grundprodukt)
            .pipe(
                retry(1),
                catchError((error) => this.errorHandling.globalApiErrorHandling(error))
            );
    }

    public readAll(): Observable<Grundprodukt[]> {
        return this.http
            .get<Grundprodukt[]>(`${this.settings.apiBaseUrl()}/grundprodukte`)
            .pipe(
                retry(1),
                catchError((error) => this.errorHandling.globalApiErrorHandling(error))
            );
    }

    public read(id: number) {
        return this.http
            .get<Grundprodukt>(`${this.settings.apiBaseUrl()}/grundprodukte/${id}`)
            .pipe(
                retry(1),
                catchError((error) => this.errorHandling.globalApiErrorHandling(error))
            );
    }

    public update(grundprodukt: Grundprodukt) {
        return this.http
            .put<Grundprodukt>(`${this.settings.apiBaseUrl()}/grundprodukte/${grundprodukt.id}`, grundprodukt)
            .pipe(
                retry(1),
                catchError((error) => this.errorHandling.globalApiErrorHandling(error))
            );
    }

    public delete(id: number) {
        return this.http
            .delete<boolean>(`${this.settings.apiBaseUrl()}/grundprodukte/${id}`)
            .pipe(
                retry(1),
                catchError((error) => this.errorHandling.globalApiErrorHandling(error))
            );
    }
}
