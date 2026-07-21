import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { IonBadge, IonButton, IonContent, IonFooter, IonHeader, IonItem, IonLabel, IonList, IonMenuButton, IonSpinner, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { EuroPreisPipe } from '../../misc/euro-preis.pipe';
import { Abrechnung } from '../../model/business/abrechnung.model';

@Component({
    selector: 'ffgbsy-abrechnung',
    templateUrl: './abrechnung.page.html',
    styleUrls: ['./abrechnung.page.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [IonButton, IonSpinner, IonFooter, IonBadge, IonLabel, IonItem, IonList, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, EuroPreisPipe],
})
export class AbrechnungPage {
    public readonly abrechnung = signal<Abrechnung>(new Abrechnung('Jakob Vesely'));
}
