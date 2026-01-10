import { Component, computed, inject, signal } from '@angular/core';
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
import { PageSpinnerComponent } from 'src/app/components/page-spinner/page-spinner.component';
import { AufnehmerService } from 'src/app/data/aufnehmer.service';
import { IAufnehmer } from 'src/app/model/aufnehmer.model';

@Component({
    selector: 'ffgbsy-aufnehmer-list',
    templateUrl: './aufnehmer-list.page.html',
    styleUrls: ['./aufnehmer-list.page.scss'],
    imports: [
        IonList,
        IonContent,
        IonHeader,
        IonTitle,
        IonToolbar,
        IonMenuButton,
        PageSpinnerComponent,
        RouterLink,
        FormsModule,
    ],
})
export class AufnehmerListPage implements ViewDidEnter {
    private aufnehmerService = inject(AufnehmerService);

    public aufnehmerFullList = signal<IAufnehmer[]>(null);
    public aufnehmerActive = computed(
        () => this.aufnehmerFullList()?.filter((a) => a.aktiv) ?? []
    );
    public aufnehmerInactive = computed(
        () => this.aufnehmerFullList()?.filter((a) => !a.aktiv) ?? []
    );

    ionViewDidEnter(): void {
        this.aufnehmerFullList.set(null);
        this.aufnehmerService
            .readAll()
            .subscribe((aufnehmer) => this.aufnehmerFullList.set(aufnehmer));
    }
}
