import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { DruckerService } from 'src/app/data/drucker.service';
import { Drucker } from 'src/app/model/drucker.class';
import { PageSpinnerComponent } from 'src/app/ui/page-spinner/page-spinner.component';

@Component({
    selector: 'ffgbsy-drucker-list',
    templateUrl: './drucker-list.page.html',
    styleUrls: ['./drucker-list.page.scss'],
    imports: [
        IonList,
        IonContent,
        IonHeader,
        RouterLink,
        IonTitle,
        IonToolbar,
        IonMenuButton,
        PageSpinnerComponent,
        FormsModule,
    ],
})
export class DruckerListPage implements ViewDidEnter {
    private druckerService = inject(DruckerService);

    public drucker = signal<Drucker[]>(null);

    ionViewDidEnter(): void {
        this.druckerService
            .readAll()
            .subscribe((items) => this.drucker.set(items));
    }
}
