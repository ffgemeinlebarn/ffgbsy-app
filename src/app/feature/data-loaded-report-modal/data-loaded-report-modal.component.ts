import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, ModalController } from '@ionic/angular/standalone';

@Component({
    selector: 'app-data-loaded-report-modal',
    templateUrl: './data-loaded-report-modal.component.html',
    styleUrls: ['./data-loaded-report-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonContent],
})
export class DataLoadedReportModalComponent {
    private readonly modalController = inject(ModalController);

    public close = () => this.modalController.dismiss(null, 'cancel');
}
