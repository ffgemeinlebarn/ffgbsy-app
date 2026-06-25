import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonMenuButton, IonNote, IonTitle, IonToolbar, ViewDidEnter } from '@ionic/angular/standalone';
import { DruckerApiService } from '../../../../../data/api/drucker-api.service';
import { IDrucker } from '../../../../../model/i-drucker.class';
import { PageSpinnerComponent } from '../../../../../ui/page-spinner/page-spinner.component';

@Component({
    selector: 'ffgbsy-drucker-list',
    templateUrl: './drucker-list.page.html',
    styleUrls: ['./drucker-list.page.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [IonLabel, IonNote, IonList, IonContent, IonHeader, RouterLink, IonTitle, IonToolbar, IonMenuButton, PageSpinnerComponent, IonItem, FormsModule],
})
export class DruckerListPage implements ViewDidEnter {
    private druckerApiService = inject(DruckerApiService);

    public drucker = signal<IDrucker[]>(null);

    ionViewDidEnter(): void {
        this.druckerApiService.readAll().subscribe((items) => this.drucker.set(items));
    }
}
