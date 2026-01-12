import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonContent, IonHeader, IonList, IonMenuButton, IonTitle, IonToolbar, ViewDidEnter } from '@ionic/angular/standalone';
import { ProduktbereicheService } from 'src/app/data/produktbereiche.service';
import { Produktbereich } from 'src/app/model/produktbereich.class';
import { PageSpinnerComponent } from 'src/app/ui/page-spinner/page-spinner.component';

@Component({
    selector: 'ffgbsy-produktbereiche-list',
    templateUrl: './produktbereiche-list.page.html',
    styleUrls: ['./produktbereiche-list.page.scss'],
    imports: [IonContent, IonToolbar, IonTitle, IonList, IonHeader, RouterLink, IonMenuButton, PageSpinnerComponent],
})
export class ProduktbereicheListPage implements ViewDidEnter {
    private produktbereicheService = inject(ProduktbereicheService);

    public produktbereiche = signal<Produktbereich[]>(null);

    ionViewDidEnter(): void {
        this.produktbereiche.set(null);
        this.produktbereicheService.readAll().subscribe((items) => this.produktbereiche.set(items));
    }
}
