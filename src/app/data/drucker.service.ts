import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, retry } from 'rxjs';
import { IDrucker } from 'src/app/model/i-drucker.class';
import { ErrorHandlingService } from './error-handling.service';
import { SettingsService } from './settings.service';

@Injectable({
    providedIn: 'root',
})
export class DruckerService {
    http = inject(HttpClient);
    settings = inject(SettingsService);
    errorHandling = inject(ErrorHandlingService);

    public create(drucker: IDrucker) {
        return this.http.post<IDrucker>(`${this.settings.apiBaseUrl()}/drucker`, drucker).pipe(
            retry(1),
            catchError((error) => this.errorHandling.globalApiErrorHandling(error)),
        );
    }

    public readAll(): Observable<IDrucker[]> {
        return this.http.get<IDrucker[]>(`${this.settings.apiBaseUrl()}/drucker`).pipe(
            retry(1),
            catchError((error) => this.errorHandling.globalApiErrorHandling(error)),
        );
    }

    public read(id: number) {
        return this.http.get<IDrucker>(`${this.settings.apiBaseUrl()}/drucker/${id}`).pipe(
            retry(1),
            catchError((error) => this.errorHandling.globalApiErrorHandling(error)),
        );
    }

    public update(drucker: IDrucker) {
        return this.http.put<IDrucker>(`${this.settings.apiBaseUrl()}/drucker/${drucker.id}`, drucker).pipe(
            retry(1),
            catchError((error) => this.errorHandling.globalApiErrorHandling(error)),
        );
    }

    public delete(id: number) {
        return this.http.delete<boolean>(`${this.settings.apiBaseUrl()}/drucker/${id}`).pipe(
            retry(1),
            catchError((error) => this.errorHandling.globalApiErrorHandling(error)),
        );
    }
}
