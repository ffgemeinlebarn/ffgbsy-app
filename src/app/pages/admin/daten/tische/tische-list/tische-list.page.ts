import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonChip, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenuButton, IonNote, IonTitle, IonToolbar, ViewDidEnter } from '@ionic/angular/standalone';
import { TischkategorienApiService } from '../../../../../data/api/tischkategorien-api.service';
import { ITischkategorie } from '../../../../../model/i-tischkategorie.interface';
import { PageSpinnerComponent } from '../../../../../ui/page-spinner/page-spinner.component';

@Component({
    selector: 'ffgbsy-tische-list',
    templateUrl: './tische-list.page.html',
    styleUrls: ['./tische-list.page.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [IonLabel, IonNote, IonChip, IonIcon, IonContent, IonToolbar, IonTitle, IonList, IonItem, IonHeader, RouterLink, IonMenuButton, PageSpinnerComponent],
})
export class TischeListPage implements ViewDidEnter {
    private readonly tischkategorienApiService = inject(TischkategorienApiService);

    public readonly tischkategorienMitTischen = signal<ITischkategorie[]>([]);

    ionViewDidEnter(): void {
        this.tischkategorienMitTischen.set([]);
        this.tischkategorienApiService.readAllNested().subscribe((items) => this.tischkategorienMitTischen.set(items));
    }
}
