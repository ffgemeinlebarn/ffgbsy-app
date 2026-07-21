import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IonButton, IonContent, IonFooter, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonTitle, IonToolbar, ModalController } from '@ionic/angular/standalone';
import { AppService } from '../../data/app.service';
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
    private app = inject(AppService);
    private data = inject(DataService);
    private modalController = inject(ModalController);

    public aufnehmer = this.data.aufnehmer;

    public close() {
        return this.modalController.dismiss(null, 'cancel');
    }

    public select(aufnehmer: PersonDto) {
        this.app.selectAufnehmer(aufnehmer);
        this.close();
    }
}
