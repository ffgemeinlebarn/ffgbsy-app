import { Injectable, computed, inject, signal } from '@angular/core';
import { Aufnehmer } from 'src/app/classes/aufnehmer.class';
import { SettingsService } from '../settings/settings.service';
import { environment } from 'src/environments/environment';
import { DataService } from '../data/data.service';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    private settings = inject(SettingsService);
    private data = inject(DataService);

    public readyToGo = computed<boolean>(() => this.aufnehmer() && this.deviceName() && this.data.loaded());

    public aufnehmer = signal<Aufnehmer>(null);
    public deviceName = computed<string>(() => this.settings.local().deviceName);
    public isAdmin = computed(() => this.settings.local().adminPin == environment.localAdminPin);

    public clearAufnehmer() {
        this.aufnehmer.set(null);
    }

    public selectAufnehmer(aufnehmer: Aufnehmer) {
        this.aufnehmer.set(aufnehmer);
    }
}
