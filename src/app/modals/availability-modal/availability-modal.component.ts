import { Component, inject } from '@angular/core';
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonItemDivider,
    IonList,
    IonTitle,
    IonToolbar,
    ModalController,
} from '@ionic/angular/standalone';
import { StatusListItemComponent } from 'src/app/components/status-list-item/status-list-item.component';
import { AvailabilityService } from 'src/app/data/availability.service';

@Component({
    selector: 'app-availability-modal',
    templateUrl: './availability-modal.component.html',
    styleUrls: ['./availability-modal.component.scss'],
    imports: [
        IonHeader,
        IonTitle,
        IonToolbar,
        IonButton,
        IonButtons,
        IonContent,
        IonList,
        IonItemDivider,
        StatusListItemComponent,
    ],
})
export class AvailabilityModalComponent {
    private availability = inject(AvailabilityService);
    private modalController = inject(ModalController);

    public apiAvailability = this.availability.apiAvailability;
    public druckerAvailabilities = this.availability.druckerAvailabilities;

    public close = () => this.modalController.dismiss(null, 'cancel');
}
