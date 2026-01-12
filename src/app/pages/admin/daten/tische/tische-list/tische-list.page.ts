import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonContent, IonHeader, IonIcon, IonList, IonMenuButton, IonTitle, IonToolbar, ViewDidEnter } from '@ionic/angular/standalone';
import { TischkategorienApiService } from 'src/app/data/api/tischkategorien-api.service';
import { ITischkategorie } from 'src/app/model/i-tischkategorie.interface';
import { PageSpinnerComponent } from 'src/app/ui/page-spinner/page-spinner.component';

@Component({
    selector: 'ffgbsy-tische-list',
    templateUrl: './tische-list.page.html',
    styleUrls: ['./tische-list.page.scss'],
    imports: [IonIcon, IonContent, IonToolbar, IonTitle, IonList, IonHeader, RouterLink, IonMenuButton, PageSpinnerComponent],
})
export class TischeListPage implements ViewDidEnter {
    private tischkategorienApiService = inject(TischkategorienApiService);

    public tischkategorienMitTischen = signal<ITischkategorie[]>([]);

    ionViewDidEnter(): void {
        this.tischkategorienMitTischen.set([]);
        this.tischkategorienApiService.readAllNested().subscribe((items) => this.tischkategorienMitTischen.set(items));
    }
}
