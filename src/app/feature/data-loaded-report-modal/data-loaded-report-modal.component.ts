import { Component, inject } from '@angular/core';
import { IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, ModalController } from '@ionic/angular/standalone';
import { AvailabilityService } from 'src/app/data/availability.service';

@Component({
    selector: 'app-data-loaded-report-modal',
    templateUrl: './data-loaded-report-modal.component.html',
    styleUrls: ['./data-loaded-report-modal.component.scss'],
    imports: [IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonContent],
})
export class DataLoadedReportModalComponent {
    private availability = inject(AvailabilityService);
    private modalController = inject(ModalController);

    public close = () => this.modalController.dismiss(null, 'cancel');
}
