import { Component, OnInit, inject } from '@angular/core';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonTitle, IonToolbar, ModalController } from '@ionic/angular/standalone';
import { DataService } from 'src/app/services/data/data.service';

@Component({
    selector: 'app-data-loaded-report-modal',
    templateUrl: './data-loaded-report-modal.component.html',
    styleUrls: ['./data-loaded-report-modal.component.scss'],
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
        IonIcon
    ]
})
export class DataLoadedReportModalComponent {

    private data = inject(DataService);
    private modalController = inject(ModalController);

    public loadedReport = this.data.loadedReport;
    public close = () => this.modalController.dismiss(null, 'cancel');
}
