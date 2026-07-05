import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonChip, IonContent, IonHeader, IonItem, IonLabel, IonList, IonMenuButton, IonNote, IonTitle, IonToolbar, ViewDidEnter } from '@ionic/angular/standalone';
import { TischkategorienApiService } from '../../../../../data/api/tischkategorien-api.service';
import { TischkategorieDto } from '../../../../../model/dto/tischkategorie.dto';
import { PageSpinnerComponent } from '../../../../../ui/page-spinner/page-spinner.component';

@Component({
    selector: 'ffgbsy-tischkategorien-list',
    templateUrl: './tischkategorien-list.page.html',
    styleUrls: ['./tischkategorien-list.page.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [IonLabel, IonNote, IonChip, IonContent, IonToolbar, IonTitle, IonList, IonHeader, RouterLink, IonItem, IonMenuButton, PageSpinnerComponent],
})
export class TischkategorienListPage implements ViewDidEnter {
    private tischkategorienApiService = inject(TischkategorienApiService);

    public tischkategorien = signal<TischkategorieDto[]>(null);

    ionViewDidEnter(): void {
        this.tischkategorienApiService.readAllNested().subscribe((items) => this.tischkategorien.set(items));
    }
}
