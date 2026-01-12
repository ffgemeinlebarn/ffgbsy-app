import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IDrucker } from 'src/app/model/i-drucker.class';
import { SettingsService } from '../settings.service';

@Injectable({
    providedIn: 'root',
})
export class DruckerApiService {
    private readonly http = inject(HttpClient);
    private readonly settings = inject(SettingsService);

    public create(drucker: IDrucker) {
        return this.http.post<IDrucker>(`${this.settings.apiBaseUrl()}/drucker`, drucker);
    }

    public readAll(): Observable<IDrucker[]> {
        return this.http.get<IDrucker[]>(`${this.settings.apiBaseUrl()}/drucker`);
    }

    public read(id: number) {
        return this.http.get<IDrucker>(`${this.settings.apiBaseUrl()}/drucker/${id}`);
    }

    public update(drucker: IDrucker) {
        return this.http.put<IDrucker>(`${this.settings.apiBaseUrl()}/drucker/${drucker.id}`, drucker);
    }

    public delete(id: number) {
        return this.http.delete<boolean>(`${this.settings.apiBaseUrl()}/drucker/${id}`);
    }
}
