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
import { Produkteinteilung } from 'src/app/classes/produkteinteilung.class';
import { PageSpinnerComponent } from 'src/app/components/page-spinner/page-spinner.component';
import { ProdukteinteilungenService } from 'src/app/services/produkteinteilungen/produkteinteilungen.service';

@Component({
    selector: 'ffgbsy-produkteinteilungen-list',
    templateUrl: './produkteinteilungen-list.page.html',
    styleUrls: ['./produkteinteilungen-list.page.scss'],
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
export class ProdukteinteilungenListPage implements ViewDidEnter {
    private produkteinteilungenService = inject(ProdukteinteilungenService);

    public produkteinteilungen = signal<Produkteinteilung[]>(null);

    ionViewDidEnter(): void {
        this.produkteinteilungen.set(null);
        this.produkteinteilungenService
            .readAll()
            .subscribe((items) => this.produkteinteilungen.set(items));
    }
}
