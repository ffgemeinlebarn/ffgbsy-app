import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, computed, effect, inject, signal } from '@angular/core';
import { map, retry, switchMap, tap } from 'rxjs';
import { AvailabilityCheck } from 'src/app/model/availability-check.model';
import { IDrucker } from 'src/app/model/i-drucker.class';
import { DataService } from '../data/data.service';
import { DruckerService } from './drucker.service';
import { SettingsService } from './settings.service';

@Injectable({
    providedIn: 'root',
})
export class AvailabilityService {
    private http = inject(HttpClient);
    private settings = inject(SettingsService);
    private drucker = inject(DruckerService);
    private data = inject(DataService);

    public all = computed(() => this.aufnehmerDataAvailability().isSuccessful() && this.druckerAvailabilities().filter((a) => a.status != 'success').length == 0);

    public aufnehmerDataAvailability = signal(new AvailabilityCheck<number>(0));
    public produktbereicheDataAvailability = signal(new AvailabilityCheck<number>(0));
    public produktkategorienDataAvailability = signal(new AvailabilityCheck<number>(0));
    public produkteinteilungenDataAvailability = signal(new AvailabilityCheck<number>(0));
    public produkteDataAvailability = signal(new AvailabilityCheck<number>(0));
    public tischkategorienDataAvailability = signal(new AvailabilityCheck<number>(0));
    public tischeDataAvailability = signal(new AvailabilityCheck<number>(0));
    public lookupDataGrossAvailibility = computed(() => {
        this.data.lookupDataSetted();
        return (
            this.aufnehmerDataAvailability().isSuccessful() &&
            this.produktbereicheDataAvailability().isSuccessful() &&
            this.produktkategorienDataAvailability().isSuccessful() &&
            this.produkteinteilungenDataAvailability().isSuccessful() &&
            this.produkteDataAvailability().isSuccessful() &&
            this.tischkategorienDataAvailability().isSuccessful() &&
            this.tischeDataAvailability().isSuccessful()
        );
    });
    public lookupDataGrossAvailibilityDatetime = computed<string>(() => (this.lookupDataGrossAvailibility() ? formatDate(new Date(), 'dd.MM.yyyy HH:mm:ss', 'en-US') : null));

    public druckerAvailabilities = signal<AvailabilityCheck<IDrucker>[]>([]);
    public druckerGrossAvailability = computed(() => this.druckerAvailabilities().filter((d) => !d.isSuccessful()).length == 0 && this.druckerAvailabilities().length > 0);
    public apiAvailability = signal(new AvailabilityCheck<string>('API'));

    constructor() {
        this.checkApi();
        this.checkDrucker();

        // Trigger again, when data received
        effect(() => this.checkData());
    }

    public checkData() {
        console.debug('[FFGBSY]', 'AvailabilityService', 'checkData()');

        this.setDataEnity(this.aufnehmerDataAvailability, this.data.aufnehmer());
        this.setDataEnity(this.produktbereicheDataAvailability, this.data.produktbereiche());
        this.setDataEnity(this.produktkategorienDataAvailability, this.data.produktkategorien());
        this.setDataEnity(this.produkteinteilungenDataAvailability, this.data.produkteinteilungen());
        this.setDataEnity(this.produkteDataAvailability, this.data.produkte());
        this.setDataEnity(this.tischkategorienDataAvailability, this.data.tischkategorien());
        this.setDataEnity(this.tischeDataAvailability, this.data.tische());
    }

    private setDataEnity(check: WritableSignal<AvailabilityCheck<number>>, data: any[]) {
        check.update((check) => {
            check.entity = data.length;
            check.status = check.entity > 0 ? 'success' : 'error';

            return check;
        });
    }

    public checkDrucker() {
        console.debug('[FFGBSY]', 'AvailabilityService', 'checkDrucker()');

        this.drucker
            .readAll()
            .pipe(
                map((d) => d.map((d) => new AvailabilityCheck<IDrucker>(d, 'busy'))),
                tap((checks) => this.druckerAvailabilities.set(checks)),
                switchMap(() => this.http.get<{ drucker: IDrucker; result: boolean }[]>(`${this.settings.apiBaseUrl()}/status/drucker`)),
                retry(1),
                map((r) => r.map((r) => new AvailabilityCheck<IDrucker>(r.drucker, r.result ? 'success' : 'error'))),
            )
            .subscribe((checks) => this.druckerAvailabilities.set(checks));
    }

    public checkApi() {
        console.debug('[FFGBSY]', 'AvailabilityService', 'checkApi()');

        this.apiAvailability.update((check) => {
            check.status = 'busy';
            return check;
        });

        this.http
            .get<{ timestamp: string; up: boolean }>(`${this.settings.apiBaseUrl()}/status/api`)
            .pipe(
                retry(1),
                map((r) => r.up),
            )
            .subscribe((result) =>
                this.apiAvailability.update((check) => {
                    check.status = result ? 'success' : 'error';
                    return check;
                }),
            );
    }
}
