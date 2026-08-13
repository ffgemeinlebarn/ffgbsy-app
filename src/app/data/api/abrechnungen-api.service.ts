import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AbrechnungKellnerStatusDto } from '../../model/dto/abrechnung-kellner-status.dto';
import { AbrechnungOverviewItemDto } from '../../model/dto/abrechnung-overview-item.dto';
import { AbrechnungDto } from '../../model/dto/abrechnung.dto';
import { RueckrechnungDto } from '../../model/dto/rueckrechnung.dto';
import { AppService } from '../app.service';
import { SettingsService } from '../settings.service';

@Injectable({
    providedIn: 'root',
})
export class AbrechnungenApiService {
    private readonly http = inject(HttpClient);
    private readonly settings = inject(SettingsService);
    private readonly appService = inject(AppService);

    private readonly abrechnungsstelle = this.appService.abrechnungKostenstelle;

    public readOverviews(abrechnungsstelle: string): Observable<AbrechnungOverviewItemDto[]> {
        return this.http.get<AbrechnungOverviewItemDto[]>(`${this.settings.apiBaseUrl()}/abrechnungen-overview/${abrechnungsstelle}`);
    }

    public readKellnerStatus(kellnerId: PersonId): Observable<AbrechnungKellnerStatusDto> {
        if (!this.abrechnungsstelle()) {
            throw new Error('Es ist keine Abrechnungsstelle festgelegt!');
        }
        return this.http.get<AbrechnungKellnerStatusDto>(`${this.settings.apiBaseUrl()}/abrechnungen-overview/${this.abrechnungsstelle()}/${kellnerId}`);
    }

    public createAbrechnung(abrechnung: AbrechnungDto) {
        return this.http.post<AbrechnungKellnerStatusDto>(`${this.settings.apiBaseUrl()}/abrechnungen`, abrechnung);
    }

    public deleteAbrechnung(id: AbrechnungId) {
        return this.http.delete<boolean>(`${this.settings.apiBaseUrl()}/abrechnungen/${id}`);
    }

    public createRueckrechnung(rueckrechnung: RueckrechnungDto) {
        return this.http.post<AbrechnungKellnerStatusDto>(`${this.settings.apiBaseUrl()}/rueckrechnungen`, rueckrechnung);
    }

    public deleteRueckrechnung(id: RueckrechnungId) {
        return this.http.delete<boolean>(`${this.settings.apiBaseUrl()}/abrechnungen/${id}`);
    }
}
