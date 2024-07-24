import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonList, IonMenuButton, IonTitle, IonToolbar, ViewDidEnter } from "@ionic/angular/standalone";
import { Produktbereich } from 'src/app/classes/produktbereich.class';
import { PageSpinnerComponent } from 'src/app/components/page-spinner/page-spinner.component';
import { ProduktbereicheService } from 'src/app/services/produktbereiche/produktbereiche.service';

@Component({
    selector: 'ffgbsy-produktbereiche-list',
    templateUrl: './produktbereiche-list.page.html',
    styleUrls: ['./produktbereiche-list.page.scss'],
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
export class ProduktbereicheListPage implements ViewDidEnter {
    private produktbereicheService = inject(ProduktbereicheService);

    public produktbereiche = signal<Produktbereich[]>(null);

    ionViewDidEnter(): void {
        this.produktbereiche.set(null);
        this.produktbereicheService.readAll().subscribe(items => this.produktbereiche.set(items));
    }
}
