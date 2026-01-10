import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
    IonContent,
    IonHeader,
    IonList,
    IonMenuButton,
    IonTitle,
    IonToolbar,
    ViewDidEnter,
} from '@ionic/angular/standalone';
import { Produktkategorie } from 'src/app/classes/produktkategorie.class';
import { PageSpinnerComponent } from 'src/app/components/page-spinner/page-spinner.component';
import { ProduktkategorienService } from 'src/app/data/produktkategorien.service';

@Component({
    selector: 'ffgbsy-produktkategorien-list',
    templateUrl: './produktkategorien-list.page.html',
    styleUrls: ['./produktkategorien-list.page.scss'],
    imports: [
        IonContent,
        IonToolbar,
        IonTitle,
        IonList,
        IonHeader,
        RouterLink,
        IonMenuButton,
        PageSpinnerComponent,
    ],
})
export class ProduktkategorienListPage implements ViewDidEnter {
    private produktkategorienService = inject(ProduktkategorienService);

    public produktkategorien = signal<Produktkategorie[]>(null);

    ionViewDidEnter(): void {
        this.produktkategorien.set(null);
        this.produktkategorienService
            .readAll()
            .subscribe((items) => this.produktkategorien.set(items));
    }
}
