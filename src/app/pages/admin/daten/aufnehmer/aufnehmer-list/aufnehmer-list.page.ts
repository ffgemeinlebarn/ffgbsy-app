import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonContent, IonHeader, IonList, IonMenuButton, IonTitle, IonToolbar, ViewDidEnter } from '@ionic/angular/standalone';
import { AufnehmerApiService } from 'src/app/data/api/aufnehmer-api.service';
import { IAufnehmer } from 'src/app/model/i-aufnehmer.model';
import { PageSpinnerComponent } from 'src/app/ui/page-spinner/page-spinner.component';

@Component({
    selector: 'ffgbsy-aufnehmer-list',
    templateUrl: './aufnehmer-list.page.html',
    styleUrls: ['./aufnehmer-list.page.scss'],
    imports: [IonList, IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton, PageSpinnerComponent, RouterLink, FormsModule],
})
export class AufnehmerListPage implements ViewDidEnter {
    private readonly aufnehmerApiService = inject(AufnehmerApiService);

    public aufnehmerFullList = signal<IAufnehmer[]>(null);
    public aufnehmerActive = computed(() => this.aufnehmerFullList()?.filter((a) => a.aktiv) ?? []);
    public aufnehmerInactive = computed(() => this.aufnehmerFullList()?.filter((a) => !a.aktiv) ?? []);

    ionViewDidEnter(): void {
        this.aufnehmerFullList.set(null);
        this.aufnehmerApiService.readAll().subscribe((aufnehmer) => this.aufnehmerFullList.set(aufnehmer));
    }
}
