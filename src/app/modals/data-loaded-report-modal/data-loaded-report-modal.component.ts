import { Component, OnInit, inject } from '@angular/core';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonTitle, IonToolbar, ModalController } from '@ionic/angular/standalone';
import { StatusListItemComponent } from 'src/app/components/status-list-item/status-list-item.component';
import { AvailabilityService } from 'src/app/services/availability/availability.service';
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
        IonIcon,
        StatusListItemComponent
    ]
})
export class DataLoadedReportModalComponent {

    private availability = inject(AvailabilityService);
    private modalController = inject(ModalController);

    public close = () => this.modalController.dismiss(null, 'cancel');
}
