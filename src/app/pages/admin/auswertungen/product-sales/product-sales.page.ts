import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    IonContent,
    IonHeader,
    IonMenuButton,
    IonTitle,
    IonToolbar,
    ViewDidEnter,
} from '@ionic/angular/standalone';
import { StatistikenService } from 'src/app/data/statistiken.service';
import { EuroPreisPipe } from 'src/app/misc/euro-preis.pipe';

@Component({
    selector: 'ffgbsy-product-sales',
    templateUrl: './product-sales.page.html',
    styleUrls: ['./product-sales.page.scss'],
    imports: [
        IonContent,
        IonHeader,
        IonTitle,
        IonToolbar,
        IonMenuButton,
        EuroPreisPipe,
        CommonModule,
        FormsModule,
    ],
})
export class ProductSalesPage implements ViewDidEnter {
    private statistikenService = inject(StatistikenService);

    public tableProdukte = signal<any>(null);

    ionViewDidEnter(): void {
        this.statistikenService
            .readProdukte()
            .subscribe((p) => this.tableProdukte.set(p));
    }
}
