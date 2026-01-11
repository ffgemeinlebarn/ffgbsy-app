import { Component, inject } from '@angular/core';
import { IonButton, IonContent, IonFooter } from '@ionic/angular/standalone';
import { AppService } from 'src/app/data/app.service';

@Component({
    selector: 'ffgbsy-aufnehmer-auswahl',
    templateUrl: './aufnehmer-auswahl.component.html',
    styleUrls: ['./aufnehmer-auswahl.component.scss'],
    imports: [IonFooter, IonButton, IonContent],
})
export class AufnehmerAuswahlComponent {
    private readonly appService = inject(AppService);

    public readonly aufnehmer = this.appService.aufnehmer;

    public selectIAufnehmer() {
        this.appService.showSelectAufnehmerModal().subscribe();
    }

    public starteBestellvorgang() {
        this.appService.createBestellung();
    }
}
