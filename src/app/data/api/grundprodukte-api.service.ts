import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GrundproduktDto } from '../../model/dto/grundprodukt.dto';
import { SettingsService } from '../settings.service';

@Injectable({
    providedIn: 'root',
})
export class GrundprodukteApiService {
    private readonly http = inject(HttpClient);
    private readonly settings = inject(SettingsService);

    public create(grundprodukt: GrundproduktDto) {
        return this.http.post<GrundproduktDto>(`${this.settings.apiBaseUrl()}/grundprodukte`, grundprodukt);
    }

    public readAll(): Observable<GrundproduktDto[]> {
        return this.http.get<GrundproduktDto[]>(`${this.settings.apiBaseUrl()}/grundprodukte`);
    }

    public read(id: number) {
        return this.http.get<GrundproduktDto>(`${this.settings.apiBaseUrl()}/grundprodukte/${id}`);
    }

    public update(grundprodukt: GrundproduktDto) {
        return this.http.put<GrundproduktDto>(`${this.settings.apiBaseUrl()}/grundprodukte/${grundprodukt.id}`, grundprodukt);
    }

    public delete(id: number) {
        return this.http.delete<boolean>(`${this.settings.apiBaseUrl()}/grundprodukte/${id}`);
    }
}
