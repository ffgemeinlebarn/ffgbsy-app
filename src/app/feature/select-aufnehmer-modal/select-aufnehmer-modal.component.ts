import { Component, inject } from '@angular/core';
import { IonButton, IonContent, IonFooter, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonTitle, IonToolbar, ModalController } from '@ionic/angular/standalone';
import { AppService } from 'src/app/data/app.service';
import { DataService } from 'src/app/data/data.service';
import { IAufnehmer } from 'src/app/model/i-aufnehmer.model';

@Component({
    selector: 'app-select-aufnehmer-modal',
    templateUrl: './select-aufnehmer-modal.component.html',
    styleUrls: ['./select-aufnehmer-modal.component.scss'],
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

    public select(aufnehmer: IAufnehmer) {
        this.app.selectAufnehmer(aufnehmer);
        this.close();
    }
}
