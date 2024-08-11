import { CommonModule, JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton, IonButtons, IonCard, IonCardHeader, IonContent, IonHeader, IonMenuButton, IonTitle, IonToolbar, ViewDidEnter } from '@ionic/angular/standalone';
import { EuroPreisPipe } from 'src/app/pipes/euro-preis/euro-preis.pipe';
import { StatistikenService } from 'src/app/services/statistiken/statistiken.service';

@Component({
    selector: 'ffgbsy-keys',
    templateUrl: './keys.page.html',
    styleUrls: ['./keys.page.scss'],
    standalone: true,
    imports: [IonCardHeader, IonButton, IonButtons, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton, JsonPipe, EuroPreisPipe, CommonModule, FormsModule]
})
export class KeysPage implements ViewDidEnter {
    private statistikenService = inject(StatistikenService);

    public kennzahlen = signal<any>(null);

    ionViewDidEnter(): void {
        this.statistikenService.readKennzahlen().subscribe((keys) => this.kennzahlen.set(keys));
    }
}
