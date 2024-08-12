import { Component, inject, signal } from '@angular/core';
import { IonContent, IonHeader, IonMenuButton, IonTitle, IonToolbar, ViewDidEnter } from '@ionic/angular/standalone';
import { KeysItemComponent } from 'src/app/components/keys-item/keys-item.component';
import { StatistikenService } from 'src/app/services/statistiken/statistiken.service';

@Component({
    selector: 'ffgbsy-keys',
    templateUrl: './keys.page.html',
    styleUrls: ['./keys.page.scss'],
    standalone: true,
    imports: [IonContent, IonTitle, IonToolbar, IonHeader, IonMenuButton, KeysItemComponent]
})
export class KeysPage implements ViewDidEnter {
    private statistikenService = inject(StatistikenService);

    public kennzahlen = signal<any>(null);

    ionViewDidEnter(): void {
        this.statistikenService.readKennzahlen().subscribe((keys) => this.kennzahlen.set(keys));
    }
}
