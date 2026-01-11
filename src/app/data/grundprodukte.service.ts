import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, retry } from 'rxjs';
import { IGrundprodukt } from 'src/app/model/i-grundprodukt.class';
import { SettingsService } from './settings.service';

@Injectable({
    providedIn: 'root',
})
export class GrundprodukteService {
    private http = inject(HttpClient);
    private settings = inject(SettingsService);

    public items = toSignal(this.readAll());

    public create(grundprodukt: IGrundprodukt) {
        return this.http.post<IGrundprodukt>(`${this.settings.apiBaseUrl()}/grundprodukte`, grundprodukt).pipe(retry(1));
    }

    public readAll(): Observable<IGrundprodukt[]> {
        return this.http.get<IGrundprodukt[]>(`${this.settings.apiBaseUrl()}/grundprodukte`).pipe(retry(1));
    }

    public read(id: number) {
        return this.http.get<IGrundprodukt>(`${this.settings.apiBaseUrl()}/grundprodukte/${id}`).pipe(retry(1));
    }

    public update(grundprodukt: IGrundprodukt) {
        return this.http.put<IGrundprodukt>(`${this.settings.apiBaseUrl()}/grundprodukte/${grundprodukt.id}`, grundprodukt).pipe(retry(1));
    }

    public delete(id: number) {
        return this.http.delete<boolean>(`${this.settings.apiBaseUrl()}/grundprodukte/${id}`).pipe(retry(1));
    }
}
