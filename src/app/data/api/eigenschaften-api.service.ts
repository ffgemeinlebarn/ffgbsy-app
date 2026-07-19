import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { EigenschaftDto } from '../../model/dto/eigenschaft.dto';
import { SettingsService } from '../settings.service';

@Injectable({
    providedIn: 'root',
})
export class EigenschaftenApiService {
    private readonly http = inject(HttpClient);
    private readonly settings = inject(SettingsService);

    public create(eigenschaft: EigenschaftDto) {
        return this.http.post<EigenschaftDto>(`${this.settings.apiBaseUrl()}/eigenschaften`, eigenschaft);
    }

    public readAll(): Observable<EigenschaftDto[]> {
        return this.http.get<EigenschaftDto[]>(`${this.settings.apiBaseUrl()}/eigenschaften`);
    }

    public read(id: EigenschaftId) {
        return this.http.get<EigenschaftDto>(`${this.settings.apiBaseUrl()}/eigenschaften/${id}`);
    }

    public update(eigenschaft: EigenschaftDto) {
        return this.http.put<EigenschaftDto>(`${this.settings.apiBaseUrl()}/eigenschaften/${eigenschaft.id}`, eigenschaft);
    }

    public delete(id: EigenschaftId) {
        return this.http.delete<boolean>(`${this.settings.apiBaseUrl()}/eigenschaften/${id}`);
    }
}
