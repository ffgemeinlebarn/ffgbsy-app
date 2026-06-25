import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { IonButton, IonContent, IonFooter, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonTitle, IonToolbar, ModalController, ViewDidEnter } from '@ionic/angular/standalone';
import { BestellungenApiService } from '../../data/api/bestellungen-api.service';
import { AppService } from '../../data/app.service';
import { EuroPreisPipe } from '../../misc/euro-preis.pipe';
import { StatusListItemComponent } from '../../ui/status-list-item/status-list-item.component';

@Component({
    selector: 'ffgbsy-bestellung-kontrolle-modal',
    templateUrl: './bestellung-kontrolle-modal.component.html',
    styleUrls: ['./bestellung-kontrolle-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [IonItem, IonHeader, EuroPreisPipe, IonContent, IonList, IonItem, IonToolbar, IonHeader, IonTitle, IonFooter, IonButton, IonIcon, IonLabel, StatusListItemComponent],
})
export class BestellungKontrolleModalComponent implements ViewDidEnter {
    private modalCtrl = inject(ModalController);
    private app = inject(AppService);
    private readonly bestellungenApiService = inject(BestellungenApiService);

    public bestellung = this.app.bestellung;
    public availabilityCheckSuccess = signal(null);
    public availabilityCheckStatus = computed(() => {
        if (this.availabilityCheckSuccess() == null) {
            return 'busy';
        } else if (this.availabilityCheckSuccess()) {
            return 'success';
        } else {
            return 'error';
        }
    });
    public availabilityCheckStatusMessage = computed(() => {
        if (this.availabilityCheckSuccess() == null) {
            return 'Prüfe Verfügbarkeit ...';
        } else if (this.availabilityCheckSuccess()) {
            return 'Alle gewünschten Produkte sind verfügbar!';
        } else {
            return 'Probleme bei der Verfügbarkeit von Produkten!';
        }
    });

    public availabilityCheckItems = signal([]);

    closeModal() {
        this.modalCtrl.dismiss();
    }

    sendBestellung() {
        this.app.sendBestellung();
        this.modalCtrl.dismiss();
    }

    ionViewDidEnter(): void {
        this.availabilityCheckSuccess.set(null);
        this.availabilityCheckItems.set([]);
        this.bestellungenApiService.checkAvailability(this.app.bestellung()).subscribe((result) => {
            this.availabilityCheckSuccess.set(result.success);
            this.availabilityCheckItems.set(result.checks.filter((check) => !check.success));
        });
    }
}
