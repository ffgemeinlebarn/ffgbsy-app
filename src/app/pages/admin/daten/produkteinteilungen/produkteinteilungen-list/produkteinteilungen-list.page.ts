import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonMenuButton, IonTitle, IonToolbar, ViewDidEnter } from '@ionic/angular/standalone';
import { ProdukteinteilungenApiService } from '../../../../../data/api/produkteinteilungen-api.service';
import { IProdukteinteilung } from '../../../../../model/i-produkteinteilung.interface';
import { PageSpinnerComponent } from '../../../../../ui/page-spinner/page-spinner.component';

@Component({
    selector: 'ffgbsy-produkteinteilungen-list',
    templateUrl: './produkteinteilungen-list.page.html',
    styleUrls: ['./produkteinteilungen-list.page.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [IonLabel, IonContent, IonToolbar, IonTitle, IonList, IonItem, IonHeader, RouterLink, IonMenuButton, PageSpinnerComponent],
})
export class ProdukteinteilungenListPage implements ViewDidEnter {
    private produkteinteilungenApiService = inject(ProdukteinteilungenApiService);

    public produkteinteilungen = signal<IProdukteinteilung[]>(null);

    ionViewDidEnter(): void {
        this.produkteinteilungen.set(null);
        this.produkteinteilungenApiService.readAll().subscribe((items) => this.produkteinteilungen.set(items));
    }
}
