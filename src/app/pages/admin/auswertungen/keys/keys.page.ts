import { Component, inject, signal } from '@angular/core';
import {
    IonContent,
    IonHeader,
    IonMenuButton,
    IonTitle,
    IonToolbar,
    ViewDidEnter,
} from '@ionic/angular/standalone';
import { StatistikenService } from 'src/app/data/statistiken.service';
import { KeysItemComponent } from 'src/app/ui/keys-item/keys-item.component';

@Component({
    selector: 'ffgbsy-keys',
    templateUrl: './keys.page.html',
    styleUrls: ['./keys.page.scss'],
    imports: [
        IonContent,
        IonTitle,
        IonToolbar,
        IonHeader,
        IonMenuButton,
        KeysItemComponent,
    ],
})
export class KeysPage implements ViewDidEnter {
    private statistikenService = inject(StatistikenService);

    public kennzahlen = signal<any>(null);

    ionViewDidEnter(): void {
        this.statistikenService
            .readKennzahlen()
            .subscribe((keys) => this.kennzahlen.set(keys));
    }
}
