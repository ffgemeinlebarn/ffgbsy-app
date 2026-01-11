import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonContent, IonHeader, IonIcon, IonList, IonMenuButton, IonTitle, IonToolbar, ViewDidEnter } from '@ionic/angular/standalone';
import { GrundprodukteService } from 'src/app/data/grundprodukte.service';
import { IGrundprodukt } from 'src/app/model/i-grundprodukt.class';
import { PageSpinnerComponent } from 'src/app/ui/page-spinner/page-spinner.component';

@Component({
    selector: 'ffgbsy-grundprodukte-list',
    templateUrl: './grundprodukte-list.page.html',
    styleUrls: ['./grundprodukte-list.page.scss'],
    imports: [IonIcon, IonContent, IonToolbar, IonTitle, IonList, IonHeader, RouterLink, IonMenuButton, PageSpinnerComponent],
})
export class GrundprodukteListPage implements ViewDidEnter {
    private grundProdukteService = inject(GrundprodukteService);

    public grundprodukte = signal<IGrundprodukt[]>(null);

    ionViewDidEnter(): void {
        this.grundprodukte.set(null);
        this.grundProdukteService.readAll().subscribe((items) => this.grundprodukte.set(items));
    }
}
