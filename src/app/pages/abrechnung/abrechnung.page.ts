import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IonBadge, IonButton, IonContent, IonFooter, IonHeader, IonItem, IonLabel, IonList, IonMenuButton, IonSpinner, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AppService } from '../../data/app.service';
import { EuroPreisPipe } from '../../misc/euro-preis.pipe';

@Component({
    selector: 'ffgbsy-abrechnung',
    templateUrl: './abrechnung.page.html',
    styleUrls: ['./abrechnung.page.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [IonButton, IonSpinner, IonFooter, IonBadge, IonLabel, IonItem, IonList, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, EuroPreisPipe],
})
export class AbrechnungPage {
    private readonly appService = inject(AppService);

    public readonly abrechnung = this.appService.abrechnung;
}
