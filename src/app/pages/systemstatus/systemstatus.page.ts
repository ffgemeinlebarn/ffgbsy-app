import { Component, inject } from '@angular/core';
import {
    IonChip,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonMenuButton,
    IonTitle,
    IonToolbar,
} from '@ionic/angular/standalone';
import { AvailabilityService } from 'src/app/data/availability.service';
import { DataService } from 'src/app/data/data.service';
import { StatusListItemComponent } from 'src/app/ui/status-list-item/status-list-item.component';

@Component({
    selector: 'ffgbsy-systemstatus',
    templateUrl: './systemstatus.page.html',
    styleUrls: ['./systemstatus.page.scss'],
    imports: [
        IonLabel,
        IonItem,
        IonHeader,
        IonToolbar,
        IonMenuButton,
        IonTitle,
        IonContent,
        IonList,
        StatusListItemComponent,
        IonChip,
        IonIcon,
    ],
})
export class SystemstatusPage {
    private availability = inject(AvailabilityService);
    private dataService = inject(DataService);

    public apiAvailability = this.availability.apiAvailability;
    public druckerAvailabilities = this.availability.druckerAvailabilities;
    public aufnehmerDataAvailability =
        this.availability.aufnehmerDataAvailability;
    public produktbereicheDataAvailability =
        this.availability.produktbereicheDataAvailability;
    public produktkategorienDataAvailability =
        this.availability.produktkategorienDataAvailability;
    public produkteinteilungenDataAvailability =
        this.availability.produkteinteilungenDataAvailability;
    public produkteDataAvailability =
        this.availability.produkteDataAvailability;
    public tischkategorienDataAvailability =
        this.availability.tischkategorienDataAvailability;
    public tischeDataAvailability = this.availability.tischeDataAvailability;

    public lookupDataLastSync =
        this.availability.lookupDataGrossAvailibilityDatetime;

    public syncData() {
        this.dataService.load();
    }

    public checkDrucker() {
        this.availability.checkDrucker();
    }

    public checkApi() {
        this.availability.checkApi();
    }
}
