import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonList, IonMenuButton, IonTitle, IonToolbar, ViewDidEnter } from "@ionic/angular/standalone";
import { Tischkategorie } from 'src/app/classes/tischkategorie.class';
import { PageSpinnerComponent } from 'src/app/components/page-spinner/page-spinner.component';
import { TischkategorienService } from 'src/app/services/tischkategorien/tischkategorien.service';

@Component({
    selector: 'ffgbsy-tischkategorien-list',
    templateUrl: './tischkategorien-list.page.html',
    styleUrls: ['./tischkategorien-list.page.scss'],
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
export class TischkategorienListPage implements ViewDidEnter {
    private tischkategorienService = inject(TischkategorienService);

    public tischkategorien = signal<Tischkategorie[]>(null);

    ionViewDidEnter(): void {
        this.tischkategorienService.readAllNested().subscribe(items => this.tischkategorien.set(items));
    }
}
