import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IonBadge, IonContent, IonHeader, IonItem, IonLabel, IonList, IonMenuButton, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AppService } from '../../../data/app.service';

@Component({
    selector: 'ffgbsy-abrechnen-rueckrechnen',
    templateUrl: './rueckrechnen.page.html',
    styleUrls: ['./rueckrechnen.page.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [IonBadge, IonLabel, IonItem, IonList, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton],
})
export class AbrechnungRueckrechnenPage {
    private readonly appService = inject(AppService);

    public readonly abrechnung = this.appService.abrechnung;
}
