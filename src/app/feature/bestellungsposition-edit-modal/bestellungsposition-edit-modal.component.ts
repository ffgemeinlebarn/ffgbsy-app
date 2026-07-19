import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
// import { FormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { form, FormField } from '@angular/forms/signals';
import { IonButton, IonCheckbox, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonRow, IonTextarea, IonTitle, IonToolbar, ModalController } from '@ionic/angular/standalone';
import { AppService } from '../../data/app.service';
import { EuroPreisPipe } from '../../misc/euro-preis.pipe';

@Component({
    selector: 'ffgbsy-bestellungsposition-edit-modal',
    templateUrl: './bestellungsposition-edit-modal.component.html',
    styleUrls: ['./bestellungsposition-edit-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [IonTextarea, IonFooter, IonItem, IonLabel, FormsModule, IonList, IonListHeader, IonIcon, IonButton, IonGrid, IonRow, IonContent, IonTitle, IonToolbar, IonCol, IonHeader, EuroPreisPipe, IonCheckbox, FormField],
})
export class BestellungspositionEditModalComponent {
    private readonly modalController = inject(ModalController);
    private readonly appService = inject(AppService);

    public bestellposition = this.appService.bestellposition;

    public eigenschaftenForm = form(this.bestellposition().eigenschaften);
    public notizForm = form(this.bestellposition().notiz);

    public changeAnzahl(change: number) {
        this.appService.bestellposition.update((b) => {
            b.anzahl.update((a) => a + change);
            return b;
        });
    }

    public confirm() {
        this.modalController.dismiss(true);
    }

    public remove() {
        this.appService.bestellung.update((bestellung) => {
            bestellung.bestellpositionen.update((bestellpositionen) => bestellpositionen.filter((b) => b.localKey != this.bestellposition().localKey));
            return bestellung;
        });
        this.modalController.dismiss(false);
    }
}
