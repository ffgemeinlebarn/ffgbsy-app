import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonMenuButton, IonTitle, IonToolbar, ViewDidEnter } from '@ionic/angular/standalone';
import { PersonenApiService } from '../../../../../data/api/personen-api.service';
import { PersonDto } from '../../../../../model/dto/aufnehmer.dto';
import { PageSpinnerComponent } from '../../../../../ui/page-spinner/page-spinner.component';

@Component({
    selector: 'ffgbsy-aufnehmer-list',
    templateUrl: './aufnehmer-list.page.html',
    styleUrls: ['./aufnehmer-list.page.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [IonLabel, IonList, IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonMenuButton, PageSpinnerComponent, RouterLink, FormsModule],
})
export class AufnehmerListPage implements ViewDidEnter {
    private readonly aufnehmerApiService = inject(PersonenApiService);

    public aufnehmerFullList = signal<PersonDto[]>(null);
    public aufnehmerActive = computed(() => this.aufnehmerFullList()?.filter((a) => a.aktiv) ?? []);
    public aufnehmerInactive = computed(() => this.aufnehmerFullList()?.filter((a) => !a.aktiv) ?? []);

    ionViewDidEnter(): void {
        this.aufnehmerFullList.set(null);
        this.aufnehmerApiService.readAll().subscribe((aufnehmer) => this.aufnehmerFullList.set(aufnehmer));
    }
}
