import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { IonButton, IonContent, IonFooter, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonTitle, IonToolbar, ModalController } from '@ionic/angular/standalone';
import { DataService } from '../../data/data.service';
import { PersonDto } from '../../model/dto/person.dto';

@Component({
    selector: 'app-select-aufnehmer-modal',
    templateUrl: './select-aufnehmer-modal.component.html',
    styleUrls: ['./select-aufnehmer-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [IonHeader, IonTitle, IonToolbar, IonButton, IonContent, IonList, IonItem, IonLabel, IonIcon, IonFooter],
})
export class SelectAufnehmerModalComponent {
    private data = inject(DataService);
    private modalController = inject(ModalController);

    public showAufnehmer = input<boolean>(true);
    public showKellner = input<boolean>(true);

    public personenFiltred = computed(() => this.data.personen().filter((p) => (p.aufnehmer && this.showAufnehmer()) || (p.kellner && this.showKellner())));

    constructor() {
        effect(() => console.log(this.showAufnehmer(), this.showKellner(), this.data.personen(), this.personenFiltred()));
    }

    public cancel() {
        return this.modalController.dismiss(null, 'cancel');
    }

    public select(person: PersonDto) {
        return this.modalController.dismiss(person, 'select');
    }
}
