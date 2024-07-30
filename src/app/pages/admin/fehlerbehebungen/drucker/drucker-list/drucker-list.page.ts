import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonContent, IonHeader, IonList, IonMenuButton, IonTitle, IonToolbar, ViewDidEnter } from '@ionic/angular/standalone';
import { Drucker } from 'src/app/classes/drucker.class';
import { PageSpinnerComponent } from 'src/app/components/page-spinner/page-spinner.component';
import { DruckerService } from 'src/app/services/drucker/drucker.service';

@Component({
    selector: 'ffgbsy-drucker-list',
    templateUrl: './drucker-list.page.html',
    styleUrls: ['./drucker-list.page.scss'],
    standalone: true,
    imports: [IonList, IonContent, IonHeader, RouterLink, IonTitle, IonToolbar, IonMenuButton, PageSpinnerComponent, CommonModule, FormsModule]
})
export class DruckerListPage implements ViewDidEnter {
    private druckerService = inject(DruckerService);

    public drucker = signal<Drucker[]>(null);

    ionViewDidEnter(): void {
        this.druckerService.readAll().subscribe(items => this.drucker.set(items));
    }

}
