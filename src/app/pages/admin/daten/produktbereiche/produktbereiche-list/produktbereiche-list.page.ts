import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonContent, IonHeader, IonList, IonMenuButton, IonTitle, IonToolbar, ViewDidEnter } from '@ionic/angular/standalone';
import { ProduktbereicheApiService } from 'src/app/data/api/produktbereiche-api.service';
import { IProduktbereich } from 'src/app/model/i-produktbereich.interface';
import { PageSpinnerComponent } from 'src/app/ui/page-spinner/page-spinner.component';

@Component({
    selector: 'ffgbsy-produktbereiche-list',
    templateUrl: './produktbereiche-list.page.html',
    styleUrls: ['./produktbereiche-list.page.scss'],
    imports: [IonContent, IonToolbar, IonTitle, IonList, IonHeader, RouterLink, IonMenuButton, PageSpinnerComponent],
})
export class ProduktbereicheListPage implements ViewDidEnter {
    private readonly produktbereicheApiService = inject(ProduktbereicheApiService);

    public readonly produktbereiche = signal<IProduktbereich[]>([]);

    ionViewDidEnter(): void {
        this.produktbereiche.set([]);
        this.produktbereicheApiService.readAll().subscribe((items) => this.produktbereiche.set(items));
    }
}
