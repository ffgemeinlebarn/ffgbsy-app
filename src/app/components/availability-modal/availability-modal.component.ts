import { Component, inject } from '@angular/core';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonTitle, IonToolbar, ModalController } from '@ionic/angular/standalone';
import { AvailabilityService } from 'src/app/services/availability/availability.service';

@Component({
    selector: 'app-availability-modal',
    templateUrl: './availability-modal.component.html',
    styleUrls: ['./availability-modal.component.scss'],
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
        IonItemDivider,
        IonLabel,
        IonIcon
    ]
})
export class AvailabilityModalComponent {

    private availability = inject(AvailabilityService);
    private modalController = inject(ModalController);

    public api = this.availability.api;
    public druckerDetails = this.availability.druckerDetails;

    public close = () => this.modalController.dismiss(null, 'cancel');
}
