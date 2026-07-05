import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonMenuButton, IonTitle, IonToolbar, ViewDidEnter } from '@ionic/angular/standalone';
import { ProduktkategorienApiService } from '../../../../../data/api/produktkategorien-api.service';
import { ProduktkategorieDto } from '../../../../../model/dto/produktkategorie.dto';
import { PageSpinnerComponent } from '../../../../../ui/page-spinner/page-spinner.component';

@Component({
    selector: 'ffgbsy-produktkategorien-list',
    templateUrl: './produktkategorien-list.page.html',
    styleUrls: ['./produktkategorien-list.page.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [IonLabel, IonContent, IonToolbar, IonTitle, IonList, IonItem, IonHeader, RouterLink, IonMenuButton, PageSpinnerComponent],
})
export class ProduktkategorienListPage implements ViewDidEnter {
    private produktkategorienApiService = inject(ProduktkategorienApiService);

    public produktkategorien = signal<ProduktkategorieDto[]>(null);

    ionViewDidEnter(): void {
        this.produktkategorien.set(null);
        this.produktkategorienApiService.readAll().subscribe((items) => this.produktkategorien.set(items));
    }
}
