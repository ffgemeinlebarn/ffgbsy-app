import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonChip, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenuButton, IonTitle, IonToolbar, ViewDidEnter } from '@ionic/angular/standalone';
import { GrundprodukteApiService } from '../../../../../data/api/grundprodukte-api.service';
import { GrundproduktDto } from '../../../../../model/dto/grundprodukt.dto';
import { PageSpinnerComponent } from '../../../../../ui/page-spinner/page-spinner.component';

@Component({
    selector: 'ffgbsy-grundprodukte-list',
    templateUrl: './grundprodukte-list.page.html',
    styleUrls: ['./grundprodukte-list.page.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [IonLabel, IonChip, IonIcon, IonContent, IonToolbar, IonTitle, IonList, IonHeader, RouterLink, IonMenuButton, IonItem, PageSpinnerComponent],
})
export class GrundprodukteListPage implements ViewDidEnter {
    private grundprodukteApiService = inject(GrundprodukteApiService);

    public grundprodukte = signal<GrundproduktDto[]>(null);

    ionViewDidEnter(): void {
        this.grundprodukte.set(null);
        this.grundprodukteApiService.readAll().subscribe((items) => this.grundprodukte.set(items));
    }
}
