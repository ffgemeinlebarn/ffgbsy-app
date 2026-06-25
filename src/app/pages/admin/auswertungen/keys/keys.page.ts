import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { IonContent, IonHeader, IonMenuButton, IonTitle, IonToolbar, ViewDidEnter } from '@ionic/angular/standalone';
import { StatistikenApiService } from '../../../../data/api/statistiken-api.service';
import { KeysItemComponent } from '../../../../ui/keys-item/keys-item.component';

@Component({
    selector: 'ffgbsy-keys',
    templateUrl: './keys.page.html',
    styleUrls: ['./keys.page.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [IonContent, IonTitle, IonToolbar, IonHeader, IonMenuButton, KeysItemComponent],
})
export class KeysPage implements ViewDidEnter {
    private statistikenApiService = inject(StatistikenApiService);

    public kennzahlen = signal<any>(null);

    ionViewDidEnter(): void {
        this.statistikenApiService.readKennzahlen().subscribe((keys) => this.kennzahlen.set(keys));
    }
}
