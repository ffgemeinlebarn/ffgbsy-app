import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { Eigenschaft } from 'src/app/model/eigenschaft.interface';
import { SettingsService } from './settings.service';

@Injectable({
    providedIn: 'root',
})
export class EigenschaftenService {
    http = inject(HttpClient);
    settings = inject(SettingsService);

    public create(eigenschaft: Eigenschaft) {
        return this.http.post<Eigenschaft>(`${this.settings.apiBaseUrl()}/eigenschaften`, eigenschaft).pipe(retry(1));
    }

    public readAll(): Observable<Eigenschaft[]> {
        return this.http.get<Eigenschaft[]>(`${this.settings.apiBaseUrl()}/eigenschaften`).pipe(retry(1));
    }

    public read(id: number) {
        return this.http.get<Eigenschaft>(`${this.settings.apiBaseUrl()}/eigenschaften/${id}`).pipe(retry(1));
    }

    public update(eigenschaft: Eigenschaft) {
        return this.http.put<Eigenschaft>(`${this.settings.apiBaseUrl()}/eigenschaften/${eigenschaft.id}`, eigenschaft).pipe(retry(1));
    }

    public delete(id: number) {
        return this.http.delete<boolean>(`${this.settings.apiBaseUrl()}/eigenschaften/${id}`).pipe(retry(1));
    }
}
