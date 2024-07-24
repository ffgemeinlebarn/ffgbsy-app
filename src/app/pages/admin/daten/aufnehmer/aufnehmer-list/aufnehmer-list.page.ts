import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonContent, IonHeader, IonList, IonMenuButton, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { PageSpinnerComponent } from 'src/app/components/page-spinner/page-spinner.component';
import { AufnehmerService } from 'src/app/services/aufnehmer/aufnehmer.service';

@Component({
    selector: 'ffgbsy-aufnehmer-list',
    templateUrl: './aufnehmer-list.page.html',
    styleUrls: ['./aufnehmer-list.page.scss'],
    standalone: true,
    imports: [
        IonList,
        IonContent,
        IonHeader,
        IonTitle,
        IonToolbar,
        IonMenuButton,
        PageSpinnerComponent,
        CommonModule,
        RouterLink,
        FormsModule
    ]
})
export class AufnehmerListPage {
    private aufnehmerService = inject(AufnehmerService);

    public aufnehmerFullList = toSignal(this.aufnehmerService.readAll());
    public aufnehmerActive = computed(() => this.aufnehmerFullList()?.filter(a => a.aktiv) ?? []);
    public aufnehmerInactive = computed(() => this.aufnehmerFullList()?.filter(a => !a.aktiv) ?? []);
}
