import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Eigenschaft } from 'src/app/model/eigenschaft.interface';
import { SettingsService } from '../settings.service';

@Injectable({
    providedIn: 'root',
})
export class EigenschaftenApiService {
    private readonly http = inject(HttpClient);
    private readonly settings = inject(SettingsService);

    public create(eigenschaft: Eigenschaft) {
        return this.http.post<Eigenschaft>(`${this.settings.apiBaseUrl()}/eigenschaften`, eigenschaft);
    }

    public readAll(): Observable<Eigenschaft[]> {
        return this.http.get<Eigenschaft[]>(`${this.settings.apiBaseUrl()}/eigenschaften`);
    }

    public read(id: number) {
        return this.http.get<Eigenschaft>(`${this.settings.apiBaseUrl()}/eigenschaften/${id}`);
    }

    public update(eigenschaft: Eigenschaft) {
        return this.http.put<Eigenschaft>(`${this.settings.apiBaseUrl()}/eigenschaften/${eigenschaft.id}`, eigenschaft);
    }

    public delete(id: number) {
        return this.http.delete<boolean>(`${this.settings.apiBaseUrl()}/eigenschaften/${id}`);
    }
}
