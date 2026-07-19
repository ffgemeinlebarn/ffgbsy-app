import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { DruckerDto } from '../../model/dto/drucker.dto';
import { SettingsService } from '../settings.service';

@Injectable({
    providedIn: 'root',
})
export class DruckerApiService {
    private readonly http = inject(HttpClient);
    private readonly settings = inject(SettingsService);

    public create(drucker: DruckerDto) {
        return this.http.post<DruckerDto>(`${this.settings.apiBaseUrl()}/drucker`, drucker);
    }

    public readAll(): Observable<DruckerDto[]> {
        return this.http.get<DruckerDto[]>(`${this.settings.apiBaseUrl()}/drucker`);
    }

    public read(id: DruckerId) {
        return this.http.get<DruckerDto>(`${this.settings.apiBaseUrl()}/drucker/${id}`);
    }

    public update(drucker: DruckerDto) {
        return this.http.put<DruckerDto>(`${this.settings.apiBaseUrl()}/drucker/${drucker.id}`, drucker);
    }

    public delete(id: DruckerId) {
        return this.http.delete<boolean>(`${this.settings.apiBaseUrl()}/drucker/${id}`);
    }
}
