import { Component, Input, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton, IonCheckbox, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonRow, IonTextarea, IonTitle, IonToolbar, ModalController } from '@ionic/angular/standalone';
import { Bestellposition } from '../../classes/bestellposition.model';
import { EuroPreisPipe } from '../../pipes/euro-preis/euro-preis.pipe';

@Component({
    selector: 'ffgbsy-bestellungsposition-edit-modal',
    templateUrl: './bestellungsposition-edit-modal.component.html',
    styleUrls: ['./bestellungsposition-edit-modal.component.scss'],
    standalone: true,
    imports: [
        IonTextarea,
        IonFooter,
        IonItem,
        IonLabel,
        IonList,
        IonListHeader,
        IonIcon,
        IonButton,
        IonGrid,
        IonRow,
        IonContent,
        IonTitle,
        IonToolbar,
        IonCol,
        IonHeader,
        FormsModule,
        EuroPreisPipe,
        IonInput,
        IonCheckbox
    ],
})
export class BestellungspositionEditModalComponent {
    private modalController = inject(ModalController);
    @Input() public bestellposition: Bestellposition;

    public save() {
        this.bestellposition.display.eigenschaften.mit = [];
        this.bestellposition.display.eigenschaften.ohne = [];
        this.bestellposition.calc_correction = 0;

        const activatedEigenschaften = this.bestellposition.eigenschaften.filter(e => (!e.in_produkt_enthalten && e.aktiv) || (e.in_produkt_enthalten && !e.aktiv));

        for (const e of activatedEigenschaften) {

            let name = e.name;

            if (!e.in_produkt_enthalten) {
                if (e.preis > 0) {
                    name = name + " (" + this.bestellposition.anzahl + "x = +" + this.displayEuroNumber(this.bestellposition.anzahl * e.preis) + ")";
                }

                this.bestellposition.display.eigenschaften.mit.push(name);
                this.bestellposition.calc_correction += (this.bestellposition.anzahl * e.preis);
            } else {
                if (e.preis > 0) {
                    name = name + " (" + this.bestellposition.anzahl + "x = -" + this.displayEuroNumber(this.bestellposition.anzahl * e.preis) + ")";
                }

                this.bestellposition.display.eigenschaften.ohne.push(name);
                this.bestellposition.calc_correction -= (this.bestellposition.anzahl * e.preis);
            }
        }
        this.modalController.dismiss(this.bestellposition);
    }

    public changeAnzahl(change: number) {
        this.bestellposition.anzahl += change;
    }

    public delete() {
        this.modalController.dismiss(null);
    }

    private displayEuroNumber(value: any) {
        return "€ " + String(parseFloat(value).toFixed(2)).replace(".", ",");
    }
}
