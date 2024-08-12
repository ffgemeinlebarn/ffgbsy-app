import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonMenuButton, IonTitle, IonToolbar, ViewDidEnter } from '@ionic/angular/standalone';
import { EuroPreisPipe } from 'src/app/pipes/euro-preis/euro-preis.pipe';
import { StatistikenService } from 'src/app/services/statistiken/statistiken.service';

@Component({
    selector: 'ffgbsy-product-sales',
    templateUrl: './product-sales.page.html',
    styleUrls: ['./product-sales.page.scss'],
    standalone: true,
    imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton, EuroPreisPipe, CommonModule, FormsModule]
})
export class ProductSalesPage implements ViewDidEnter {

    private statistikenService = inject(StatistikenService);

    public tableProdukte = signal<any>(null);

    ionViewDidEnter(): void {
        this.statistikenService.readProdukte().subscribe((p) => this.tableProdukte.set(p));
    }
}
