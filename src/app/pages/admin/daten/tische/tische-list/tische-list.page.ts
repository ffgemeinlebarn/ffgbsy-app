import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
    IonContent,
    IonHeader,
    IonIcon,
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
    selector: 'ffgbsy-tische-list',
    templateUrl: './tische-list.page.html',
    styleUrls: ['./tische-list.page.scss'],
    imports: [
        IonIcon,
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
export class TischeListPage implements ViewDidEnter {
    private tischkategorienService = inject(TischkategorienService);

    public tischkategorienMitTischen = signal<Tischkategorie[]>(null);

    ionViewDidEnter(): void {
        this.tischkategorienMitTischen.set(null);
        this.tischkategorienService
            .readAllNested()
            .subscribe((items) => this.tischkategorienMitTischen.set(items));
    }
}
