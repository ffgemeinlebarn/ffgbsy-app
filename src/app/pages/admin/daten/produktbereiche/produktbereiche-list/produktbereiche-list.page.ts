import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonMenuButton, IonTitle, IonToolbar, ViewDidEnter } from '@ionic/angular/standalone';
import { ProduktbereicheApiService } from '../../../../../data/api/produktbereiche-api.service';
import { ProduktDtobereich } from '../../../../../model/i-produktbereich.interface';
import { PageSpinnerComponent } from '../../../../../ui/page-spinner/page-spinner.component';

@Component({
    selector: 'ffgbsy-produktbereiche-list',
    templateUrl: './produktbereiche-list.page.html',
    styleUrls: ['./produktbereiche-list.page.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [IonLabel, IonContent, IonToolbar, IonTitle, IonList, IonHeader, RouterLink, IonItem, IonMenuButton, PageSpinnerComponent],
})
export class ProduktbereicheListPage implements ViewDidEnter {
    private readonly produktbereicheApiService = inject(ProduktbereicheApiService);

    public readonly produktbereiche = signal<ProduktDtobereich[]>([]);

    ionViewDidEnter(): void {
        this.produktbereiche.set([]);
        this.produktbereicheApiService.readAll().subscribe((items) => this.produktbereiche.set(items));
    }
}
