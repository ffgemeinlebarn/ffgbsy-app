import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonContent, IonHeader, IonList, IonMenuButton, IonTitle, IonToolbar, ViewDidEnter } from '@ionic/angular/standalone';
import { ProduktkategorienApiService } from 'src/app/data/api/produktkategorien-api.service';
import { IProduktkategorie } from 'src/app/model/i-produktkategorie.interface';
import { PageSpinnerComponent } from 'src/app/ui/page-spinner/page-spinner.component';

@Component({
    selector: 'ffgbsy-produktkategorien-list',
    templateUrl: './produktkategorien-list.page.html',
    styleUrls: ['./produktkategorien-list.page.scss'],
    imports: [IonContent, IonToolbar, IonTitle, IonList, IonHeader, RouterLink, IonMenuButton, PageSpinnerComponent],
})
export class ProduktkategorienListPage implements ViewDidEnter {
    private produktkategorienApiService = inject(ProduktkategorienApiService);

    public produktkategorien = signal<IProduktkategorie[]>(null);

    ionViewDidEnter(): void {
        this.produktkategorien.set(null);
        this.produktkategorienApiService.readAll().subscribe((items) => this.produktkategorien.set(items));
    }
}
