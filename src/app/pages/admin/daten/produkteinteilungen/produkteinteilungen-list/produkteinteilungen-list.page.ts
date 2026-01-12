import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonContent, IonHeader, IonList, IonMenuButton, IonTitle, IonToolbar, ViewDidEnter } from '@ionic/angular/standalone';
import { ProdukteinteilungenApiService } from 'src/app/data/api/produkteinteilungen-api.service';
import { Produkteinteilung } from 'src/app/model/produkteinteilung.class';
import { PageSpinnerComponent } from 'src/app/ui/page-spinner/page-spinner.component';

@Component({
    selector: 'ffgbsy-produkteinteilungen-list',
    templateUrl: './produkteinteilungen-list.page.html',
    styleUrls: ['./produkteinteilungen-list.page.scss'],
    imports: [IonContent, IonToolbar, IonTitle, IonList, IonHeader, RouterLink, IonMenuButton, PageSpinnerComponent],
})
export class ProdukteinteilungenListPage implements ViewDidEnter {
    private produkteinteilungenApiService = inject(ProdukteinteilungenApiService);

    public produkteinteilungen = signal<Produkteinteilung[]>(null);

    ionViewDidEnter(): void {
        this.produkteinteilungen.set(null);
        this.produkteinteilungenApiService.readAll().subscribe((items) => this.produkteinteilungen.set(items));
    }
}
