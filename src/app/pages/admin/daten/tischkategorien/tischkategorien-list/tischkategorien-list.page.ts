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
import { TischkategorienService } from 'src/app/data/tischkategorien.service';
import { Tischkategorie } from 'src/app/model/tischkategorie.class';
import { PageSpinnerComponent } from 'src/app/ui/page-spinner/page-spinner.component';

@Component({
    selector: 'ffgbsy-tischkategorien-list',
    templateUrl: './tischkategorien-list.page.html',
    styleUrls: ['./tischkategorien-list.page.scss'],
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
export class TischkategorienListPage implements ViewDidEnter {
    private tischkategorienService = inject(TischkategorienService);

    public tischkategorien = signal<Tischkategorie[]>(null);

    ionViewDidEnter(): void {
        this.tischkategorienService
            .readAllNested()
            .subscribe((items) => this.tischkategorien.set(items));
    }
}
