import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonContent, IonHeader, IonList, IonMenuButton, IonTitle, IonToolbar, ViewDidEnter } from '@ionic/angular/standalone';
import { DruckerApiService } from 'src/app/data/api/drucker-api.service';
import { IDrucker } from 'src/app/model/i-drucker.class';
import { PageSpinnerComponent } from 'src/app/ui/page-spinner/page-spinner.component';

@Component({
    selector: 'ffgbsy-drucker-list',
    templateUrl: './drucker-list.page.html',
    styleUrls: ['./drucker-list.page.scss'],
    imports: [IonList, IonContent, IonHeader, RouterLink, IonTitle, IonToolbar, IonMenuButton, PageSpinnerComponent, FormsModule],
})
export class DruckerListPage implements ViewDidEnter {
    private druckerApiService = inject(DruckerApiService);

    public drucker = signal<IDrucker[]>(null);

    ionViewDidEnter(): void {
        this.druckerApiService.readAll().subscribe((items) => this.drucker.set(items));
    }
}
