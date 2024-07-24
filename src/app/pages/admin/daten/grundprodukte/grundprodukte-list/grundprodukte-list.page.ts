import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonList, IonMenuButton, IonTitle, IonToolbar, ViewDidEnter } from "@ionic/angular/standalone";
import { Grundprodukt } from 'src/app/classes/grundprodukt.class';
import { PageSpinnerComponent } from 'src/app/components/page-spinner/page-spinner.component';
import { GrundprodukteService } from 'src/app/services/grundprodukte/grundprodukte.service';

@Component({
    selector: 'ffgbsy-grundprodukte-list',
    templateUrl: './grundprodukte-list.page.html',
    styleUrls: ['./grundprodukte-list.page.scss'],
    standalone: true,
    imports: [
        IonButton,
        IonButtons,
        IonIcon,
        IonContent,
        IonToolbar,
        IonTitle,
        IonList,
        IonHeader,
        RouterLink,
        IonMenuButton,
        PageSpinnerComponent
    ],
})
export class GrundprodukteListPage implements ViewDidEnter {
    private grundProdukteService = inject(GrundprodukteService);

    public grundprodukte = signal<Grundprodukt[]>(null);

    ionViewDidEnter(): void {
        this.grundprodukte.set(null);
        this.grundProdukteService.readAll().subscribe(items => this.grundprodukte.set(items));
    }
}
