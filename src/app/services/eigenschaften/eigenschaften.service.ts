import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, retry } from 'rxjs';
import { IEigenschaft } from 'src/app/classes/i-eigenschaft.interface';
import { ErrorHandlingService } from '../error-handling/error-handling.service';
import { SettingsService } from '../settings/settings.service';

@Injectable({
    providedIn: 'root'
})
export class EigenschaftenService {
    http = inject(HttpClient);
    settings = inject(SettingsService);
    errorHandling = inject(ErrorHandlingService);

    public create(eigenschaft: IEigenschaft) {
        return this.http
            .post<IEigenschaft>(`${this.settings.apiBaseUrl()}/eigenschaften`, eigenschaft)
            .pipe(
                retry(1),
                catchError((error) => this.errorHandling.globalApiErrorHandling(error))
            );
    }

    public readAll(): Observable<IEigenschaft[]> {
        return this.http
            .get<IEigenschaft[]>(`${this.settings.apiBaseUrl()}/eigenschaften`)
            .pipe(
                retry(1),
                catchError((error) => this.errorHandling.globalApiErrorHandling(error))
            );
    }

    public read(id: number) {
        return this.http
            .get<IEigenschaft>(`${this.settings.apiBaseUrl()}/eigenschaften/${id}`)
            .pipe(
                retry(1),
                catchError((error) => this.errorHandling.globalApiErrorHandling(error))
            );
    }

    public update(eigenschaft: IEigenschaft) {
        return this.http
            .put<IEigenschaft>(`${this.settings.apiBaseUrl()}/eigenschaften/${eigenschaft.id}`, eigenschaft)
            .pipe(
                retry(1),
                catchError((error) => this.errorHandling.globalApiErrorHandling(error))
            );
    }

    public delete(id: number) {
        return this.http
            .delete<boolean>(`${this.settings.apiBaseUrl()}/eigenschaften/${id}`)
            .pipe(
                retry(1),
                catchError((error) => this.errorHandling.globalApiErrorHandling(error))
            );
    }
}
