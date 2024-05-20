import { Component, OnInit, inject } from '@angular/core';
import { IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonTitle, IonToolbar, ModalController } from '@ionic/angular/standalone';
import { Aufnehmer } from 'src/app/classes/aufnehmer.model';
import { AppService } from 'src/app/services/app/app.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
    selector: 'app-select-aufnehmer-modal',
    templateUrl: './select-aufnehmer-modal.component.html',
    styleUrls: ['./select-aufnehmer-modal.component.scss'],
    standalone: true,
    imports: [
        IonHeader,
        IonTitle,
        IonToolbar,
        IonButton,
        IonButtons,
        IonContent,
        IonList,
        IonItem,
        IonLabel,
        IonIcon,
        IonFooter
    ]
})
export class SelectAufnehmerModalComponent {
    private app = inject(AppService);
    private data = inject(DataService);
    private modalController = inject(ModalController);

    public aufnehmer = this.data.aufnehmer;

    public close() {
        return this.modalController.dismiss(null, 'cancel');
    };

    public select(aufnehmer: Aufnehmer) {
        this.app.selectAufnehmer(aufnehmer);
        this.close();
    }
}
