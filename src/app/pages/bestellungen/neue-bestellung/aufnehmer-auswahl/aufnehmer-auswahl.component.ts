import { Component, inject, input } from '@angular/core';
import { IonContent, IonButton, IonFooter } from '@ionic/angular/standalone';
import { Aufnehmer } from 'src/app/classes/aufnehmer.class';
import { AppService } from 'src/app/services/app/app.service';

@Component({
    selector: 'app-aufnehmer-auswahl',
    templateUrl: './aufnehmer-auswahl.component.html',
    styleUrls: ['./aufnehmer-auswahl.component.scss'],
    standalone: true,
    imports: [IonFooter, IonButton, IonContent]
})
export class AufnehmerAuswahlComponent {
    private app = inject(AppService);

    public aufnehmer = input<Aufnehmer>();

    public selectAufnehmer() {
        this.app.showSelectAufnehmerModal();
    }

    public starteBestellvorgang() {
        this.app.createNewBestellung();
    }
}
