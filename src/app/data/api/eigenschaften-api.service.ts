import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IEigenschaft } from '../../model/i-eigenschaft.interface';
import { SettingsService } from '../settings.service';

@Injectable({
    providedIn: 'root',
})
export class EigenschaftenApiService {
    private readonly http = inject(HttpClient);
    private readonly settings = inject(SettingsService);

    public create(eigenschaft: IEigenschaft) {
        return this.http.post<IEigenschaft>(`${this.settings.apiBaseUrl()}/eigenschaften`, eigenschaft);
    }

    public readAll(): Observable<IEigenschaft[]> {
        return this.http.get<IEigenschaft[]>(`${this.settings.apiBaseUrl()}/eigenschaften`);
    }

    public read(id: number) {
        return this.http.get<IEigenschaft>(`${this.settings.apiBaseUrl()}/eigenschaften/${id}`);
    }

    public update(eigenschaft: IEigenschaft) {
        return this.http.put<IEigenschaft>(`${this.settings.apiBaseUrl()}/eigenschaften/${eigenschaft.id}`, eigenschaft);
    }

    public delete(id: number) {
        return this.http.delete<boolean>(`${this.settings.apiBaseUrl()}/eigenschaften/${id}`);
    }
}
