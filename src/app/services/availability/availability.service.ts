import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, retry, tap } from 'rxjs';
import { SettingsService } from '../settings/settings.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Drucker } from 'src/app/classes/drucker.class';
import { ModalController } from '@ionic/angular/standalone';
import { AvailabilityModalComponent } from 'src/app/components/availability-modal/availability-modal.component';

@Injectable({
    providedIn: 'root'
})
export class AvailabilityService {
    private http = inject(HttpClient);
    private settings = inject(SettingsService);
    private modalController = inject(ModalController);

    public all = computed(() => this.api() && this.druckerDetails().length > 0 && this.drucker());
    public api = toSignal(this.getApiStatus(), { initialValue: false });
    public drucker = computed<boolean>(() => this.druckerDetails().length > 0 && this.druckerDetails().filter(item => !item.result).length == 0);
    public druckerDetails = toSignal(this.getDruckerStatus(), { initialValue: [] });

    public check() {
        this.getApiStatus().subscribe();
        this.getDruckerStatus().subscribe();
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

    public getDruckerStatus() {
        return this.http
            .get<{ drucker: Drucker, result: boolean }[]>(`${this.settings.apiBaseUrl()}/status/drucker`)
            .pipe(
                retry(1)
            );
    }
}
