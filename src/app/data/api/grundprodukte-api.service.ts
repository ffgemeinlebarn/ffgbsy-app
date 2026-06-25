import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGrundprodukt } from '../../model/i-grundprodukt.class';
import { SettingsService } from '../settings.service';

@Injectable({
    providedIn: 'root',
})
export class GrundprodukteApiService {
    private readonly http = inject(HttpClient);
    private readonly settings = inject(SettingsService);

    public create(grundprodukt: IGrundprodukt) {
        return this.http.post<IGrundprodukt>(`${this.settings.apiBaseUrl()}/grundprodukte`, grundprodukt);
    }

    public readAll(): Observable<IGrundprodukt[]> {
        return this.http.get<IGrundprodukt[]>(`${this.settings.apiBaseUrl()}/grundprodukte`);
    }

    public read(id: number) {
        return this.http.get<IGrundprodukt>(`${this.settings.apiBaseUrl()}/grundprodukte/${id}`);
    }

    public update(grundprodukt: IGrundprodukt) {
        return this.http.put<IGrundprodukt>(`${this.settings.apiBaseUrl()}/grundprodukte/${grundprodukt.id}`, grundprodukt);
    }

    public delete(id: number) {
        return this.http.delete<boolean>(`${this.settings.apiBaseUrl()}/grundprodukte/${id}`);
    }
}
