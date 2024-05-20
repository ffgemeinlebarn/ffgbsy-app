import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ModalController } from '@ionic/angular/standalone';
import { Observable, forkJoin, map, retry, timer } from 'rxjs';
import { AvailabilityCheck } from 'src/app/classes/availability-check.model';
import { Drucker } from 'src/app/classes/drucker.class';
import { AvailabilityModalComponent } from 'src/app/modals/availability-modal/availability-modal.component';
import { DataService } from '../data/data.service';
import { DruckerService } from '../drucker/drucker.service';
import { SettingsService } from '../settings/settings.service';

@Injectable({
    providedIn: 'root'
})
export class AvailabilityService {
    private http = inject(HttpClient);
    private settings = inject(SettingsService);
    private drucker = inject(DruckerService);
    private data = inject(DataService);
    private modalController = inject(ModalController);

    public all = computed(() =>
        this.aufnehmerDataAvailability().isSuccessful() &&
        this.druckerAvailabilities().filter(a => a.status != 'success').length == 0
    );

    public aufnehmerDataAvailability = signal(new AvailabilityCheck<number>(0));
    public produktbereicheDataAvailability = signal(new AvailabilityCheck<number>(0));
    public produktkategorienDataAvailability = signal(new AvailabilityCheck<number>(0));
    public produkteinteilungenDataAvailability = signal(new AvailabilityCheck<number>(0));
    public produkteDataAvailability = signal(new AvailabilityCheck<number>(0));
    public tischkategorienDataAvailability = signal(new AvailabilityCheck<number>(0));
    public tischeDataAvailability = signal(new AvailabilityCheck<number>(0));
    public lookupDataGrossAvailibility = computed(() => {
        this.data.lookupDataSetted();
        return this.aufnehmerDataAvailability().isSuccessful() && this.produktbereicheDataAvailability().isSuccessful() && this.produktkategorienDataAvailability().isSuccessful() && this.produkteinteilungenDataAvailability().isSuccessful() && this.produkteDataAvailability().isSuccessful() && this.tischkategorienDataAvailability().isSuccessful() && this.tischeDataAvailability().isSuccessful()
    });
    public lookupDataGrossAvailibilityDatetime = computed<string>(() => this.lookupDataGrossAvailibility() ? formatDate(new Date(), 'dd.MM.YYYY HH:mm:ss', 'en-US') : null);

    public druckerAvailabilities = toSignal(this.drucker.readAll().pipe(map((d) => d.map(d => new AvailabilityCheck<Drucker>(d)))), { initialValue: [] });
    public druckerGrossAvailability = computed(() => this.druckerAvailabilities().filter(d => !d.isSuccessful).length > 0);

    public apiAvailability = signal(new AvailabilityCheck<string>("API"));

    constructor() {
        effect(() => {
            this.checkData();
        });
        effect(() => this.checkApi());
        effect(() => this.checkDrucker());
    }

    public checkData() {
        this.setDataEnity(this.aufnehmerDataAvailability(), this.data.aufnehmer());
        this.setDataEnity(this.produktbereicheDataAvailability(), this.data.produktbereiche());
        this.setDataEnity(this.produktkategorienDataAvailability(), this.data.produktkategorien());
        this.setDataEnity(this.produkteinteilungenDataAvailability(), this.data.produkteinteilungen());
        this.setDataEnity(this.produkteDataAvailability(), this.data.produkte());
        this.setDataEnity(this.tischkategorienDataAvailability(), this.data.tischkategorien());
        this.setDataEnity(this.tischeDataAvailability(), this.data.tische());
    }

    private setDataEnity(check: AvailabilityCheck<number>, array: any[]) {
        check.entity = array.length;
        check.status = check.entity > 0 ? "success" : "error";
    }

    public checkDrucker() {
        this.druckerAvailabilities().forEach(d => d.status = 'busy');
        this.druckerAvailabilities().forEach(d =>
            this.getStatusOfDrucker(d.entity.id).subscribe(r => d.status = r.result ? 'success' : 'error')
        );
    }

    public checkApi() {
        this.apiAvailability().status = 'busy';
        forkJoin({
            api: this.getApiStatus(),
            minDuration: timer(1000)
        }).subscribe(({ api }) => this.apiAvailability().status = api ? 'success' : 'error');
    }

    public async showDetailsModal() {
        const modal = await this.modalController.create({
            component: AvailabilityModalComponent,
            canDismiss: true,
            breakpoints: [0.1, 0.5, 1],
            initialBreakpoint: 1
        });
        modal.present();
    }

    public getApiStatus(): Observable<boolean> {
        return this.http
            .get(`${this.settings.apiBaseUrl()}/status/api`, {
                observe: 'response'
            })
            .pipe(
                retry(1),
                map((r) => {
                    return r.status == 200;
                }),
            );
    }

    public getStatusOfAllDrucker() {
        return this.http
            .get<{ drucker: Drucker, result: boolean }[]>(`${this.settings.apiBaseUrl()}/status/drucker`)
            .pipe(
                retry(1)
            );
    }

    public getStatusOfDrucker(id: number) {
        return this.http
            .get<{ drucker: Drucker, result: boolean }>(`${this.settings.apiBaseUrl()}/status/drucker/${id}`)
            .pipe(
                retry(1)
            );
    }
}
