import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, retry } from 'rxjs';
import { Produktkategorie } from 'src/app/model/produktkategorie.class';
import { ErrorHandlingService } from './error-handling.service';
import { SettingsService } from './settings.service';

@Injectable({
    providedIn: 'root',
})
export class ProduktkategorienService {
    http = inject(HttpClient);
    settings = inject(SettingsService);
    errorHandling = inject(ErrorHandlingService);

    public create(produktkategorien: Produktkategorie) {
        return this.http
            .post<Produktkategorie>(
                `${this.settings.apiBaseUrl()}/produktkategorien`,
                produktkategorien
            )
            .pipe(
                retry(1),
                catchError((error) =>
                    this.errorHandling.globalApiErrorHandling(error)
                )
            );
    }

    public readAll(): Observable<Produktkategorie[]> {
        return this.http
            .get<Produktkategorie[]>(
                `${this.settings.apiBaseUrl()}/produktkategorien`
            )
            .pipe(
                retry(1),
                catchError((error) =>
                    this.errorHandling.globalApiErrorHandling(error)
                )
            );
    }

    public read(id: number) {
        return this.http
            .get<Produktkategorie>(
                `${this.settings.apiBaseUrl()}/produktkategorien/${id}`
            )
            .pipe(
                retry(1),
                catchError((error) =>
                    this.errorHandling.globalApiErrorHandling(error)
                )
            );
    }

    public update(produktkategorien: Produktkategorie) {
        return this.http
            .put<Produktkategorie>(
                `${this.settings.apiBaseUrl()}/produktkategorien/${
                    produktkategorien.id
                }`,
                produktkategorien
            )
            .pipe(
                retry(1),
                catchError((error) =>
                    this.errorHandling.globalApiErrorHandling(error)
                )
            );
    }

    public delete(id: number) {
        return this.http
            .delete<boolean>(
                `${this.settings.apiBaseUrl()}/produktkategorien/${id}`
            )
            .pipe(
                retry(1),
                catchError((error) =>
                    this.errorHandling.globalApiErrorHandling(error)
                )
            );
    }
}
