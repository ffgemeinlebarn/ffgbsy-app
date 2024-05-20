import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IonButton, IonButtons, IonHeader, IonIcon, IonMenuButton, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Tisch } from 'src/app/classes/tisch.class';
import { AppService } from 'src/app/services/app/app.service';
import { FrontendService } from 'src/app/services/frontend/frontend.service';
import { AufnehmerAuswahlComponent } from './aufnehmer-auswahl/aufnehmer-auswahl.component';
import { BestellungEditComponent } from './bestellung-edit/bestellung-edit.component';
import { TischAuswahlComponent } from './tisch-auswahl/tisch-auswahl.component';

@Component({
    selector: 'ffgbsy-neue-bestellung',
    templateUrl: './neue-bestellung.page.html',
    styleUrls: ['./neue-bestellung.page.scss'],
    standalone: true,
    imports: [
        IonIcon,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonButtons,
        IonButton,
        IonMenuButton,
        NgClass,
        AufnehmerAuswahlComponent,
        TischAuswahlComponent,
        BestellungEditComponent
    ],
})
export class NeueBestellungPage {

    private app = inject(AppService);
    private frontend = inject(FrontendService);

    public bestellung = this.app.bestellung;
    public aufnehmer = this.app.aufnehmer;

    /*******************************************************************************
    *** Tischauswahl
    *******************************************************************************/

    selectTisch(tisch: Tisch) {
        this.bestellung().tisch = tisch;
        this.bestellung().status = 'bestellpositionen';
    }

    /*******************************************************************************
    *** Sonstiges
    *******************************************************************************/

    async askForCancelBestellung() {
        await this.frontend.showJaNeinAlert(
            'Abbruch der Bestellung',
            'Willst du die Bestellung wirklich abbrechen? Alle enthaltenen Positionen werden gelöscht.'
        ).then(_ => this.app.cancelBestellung());
    }
}
