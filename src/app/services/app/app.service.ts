import { Injectable, computed, inject, signal } from '@angular/core';
import { Aufnehmer } from 'src/app/classes/aufnehmer.class';
import { SettingsService } from '../settings/settings.service';
import { environment } from 'src/environments/environment';
import { DataService } from '../data/data.service';
import { AvailabilityService } from '../availability/availability.service';
import { ModalController } from '@ionic/angular/standalone';
import { SelectAufnehmerModalComponent } from 'src/app/components/select-aufnehmer-modal/select-aufnehmer-modal.component';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    private settings = inject(SettingsService);
    private data = inject(DataService);
    private availability = inject(AvailabilityService);
    private modalController = inject(ModalController);

    public readyToGo = computed<boolean>(() => this.aufnehmer() && this.deviceName() && this.availability.api && this.data.loaded());

    public aufnehmer = signal<Aufnehmer>(null);
    public deviceName = computed<string>(() => this.settings.local().deviceName);
    public isAdmin = computed(() => this.settings.local().adminPin == environment.localAdminPin);

    public async showSelectAufnehmerModal() {
        const modal = await this.modalController.create({
            component: SelectAufnehmerModalComponent,
            canDismiss: true,
            breakpoints: [0.1, 0.5, 1],
            initialBreakpoint: 1
        });
        modal.present();
    }

    public clearAufnehmer() {
        this.aufnehmer.set(null);
    }

    public selectAufnehmer(aufnehmer: Aufnehmer) {
        this.aufnehmer.set(aufnehmer);
    }
}
