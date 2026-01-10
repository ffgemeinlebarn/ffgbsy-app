import { Component, inject, input } from '@angular/core';
import { IonButton, IonContent, IonFooter } from '@ionic/angular/standalone';
import { AppService } from 'src/app/data/app.service';
import { IAufnehmer } from 'src/app/model/aufnehmer.model';

@Component({
    selector: 'app-aufnehmer-auswahl',
    templateUrl: './aufnehmer-auswahl.component.html',
    styleUrls: ['./aufnehmer-auswahl.component.scss'],
    imports: [IonFooter, IonButton, IonContent],
})
export class AufnehmerAuswahlComponent {
    private app = inject(AppService);

    public aufnehmer = input<IAufnehmer>();

    public selectIAufnehmer() {
        this.app.showSelectAufnehmerModal();
    }

    public starteBestellvorgang() {
        this.app.createBestellung();
    }
}
