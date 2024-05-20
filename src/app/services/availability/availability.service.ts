import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ModalController } from '@ionic/angular/standalone';
import { Observable, map, retry } from 'rxjs';
import { Drucker } from 'src/app/classes/drucker.class';
import { AvailabilityModalComponent } from 'src/app/modals/availability-modal/availability-modal.component';
import { SettingsService } from '../settings/settings.service';

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
    public druckerDetails = toSignal(this.getStatusOfAllDrucker(), { initialValue: [] });

    // toSignal(this.drucker.readAll().pipe(map((items) => items.map((item) => ({ drucker: item, result: null })))), { initialValue: [] });

    public check() {
        this.getApiStatus().subscribe();
        this.getStatusOfAllDrucker().subscribe();
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
