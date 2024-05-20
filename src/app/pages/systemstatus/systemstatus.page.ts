import { Component, inject } from '@angular/core';
import { IonButton, IonChip, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenuButton, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { StatusListItemComponent } from 'src/app/components/status-list-item/status-list-item.component';
import { AvailabilityService } from 'src/app/services/availability/availability.service';

@Component({
    selector: 'ffgbsy-systemstatus',
    templateUrl: './systemstatus.page.html',
    styleUrls: ['./systemstatus.page.scss'],
    standalone: true,
    imports: [
        IonLabel,
        IonItem,
        IonHeader,
        IonToolbar,
        IonMenuButton,
        IonTitle,
        IonContent,
        IonList,
        IonButton,
        StatusListItemComponent,
        IonChip,
        IonIcon
    ],
})
export class SystemstatusPage {
    private availability = inject(AvailabilityService);

    public apiAvailability = this.availability.apiAvailability;
    public druckerAvailabilities = this.availability.druckerAvailabilities;
    public aufnehmerDataAvailability = this.availability.aufnehmerDataAvailability;
    public produktbereicheDataAvailability = this.availability.produktbereicheDataAvailability;
    public produktkategorienDataAvailability = this.availability.produktkategorienDataAvailability;
    public produkteinteilungenDataAvailability = this.availability.produkteinteilungenDataAvailability;
    public produkteDataAvailability = this.availability.produkteDataAvailability;
    public tischkategorienDataAvailability = this.availability.tischkategorienDataAvailability;
    public tischeDataAvailability = this.availability.tischeDataAvailability;

    public lookupDataLastSync = this.availability.lookupDataGrossAvailibilityDatetime;

    checkDrucker() {
        this.availability.checkDrucker();
    }

    checkApi() {
        this.availability.checkApi();
    }
}
