import { JsonPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Bestellposition } from 'src/app/classes/bestellposition.class';
import { Produkt } from 'src/app/classes/produkt.class';
import { Produkteinteilung } from 'src/app/classes/produkteinteilung.class';
import { Produktkategorie } from 'src/app/classes/produktkategorie.class';
import { Tisch } from 'src/app/classes/tisch.class';
import { Tischkategorie } from 'src/app/classes/tischkategorie.class';
import { BestellungKontrolleModalComponent } from 'src/app/modals/bestellung-kontrolle/bestellung-kontrolle-modal.component';
import { BestellungspositionEditModalComponent } from 'src/app/modals/bestellungsposition-edit-modal/bestellungsposition-edit-modal.component';
import { AppService } from 'src/app/services/app/app.service';
import { DataService } from 'src/app/services/data/data.service';
import { FrontendService } from 'src/app/services/frontend/frontend.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { EuroPreisPipe } from '../../../pipes/euro-preis/euro-preis.pipe';
import { AufnehmerAuswahlComponent } from './aufnehmer-auswahl/aufnehmer-auswahl.component';
import { TischAuswahlComponent } from './tisch-auswahl/tisch-auswahl.component';
import { BestellungEditComponent } from './bestellung-edit/bestellung-edit.component';

@Component({
    selector: 'ffgbsy-neue-bestellung',
    templateUrl: './neue-bestellung.page.html',
    styleUrls: ['./neue-bestellung.page.scss'],
    standalone: true,
    imports: [
        IonicModule,
        NgIf,
        NgFor,
        NgClass,
        FormsModule,
        EuroPreisPipe,
        JsonPipe,
        AufnehmerAuswahlComponent,
        TischAuswahlComponent,
        BestellungEditComponent
    ],
})
export class NeueBestellungPage {

    private app = inject(AppService);
    private data = inject(DataService);
    frontend = inject(FrontendService);
    notification = inject(NotificationService);
    modalController = inject(ModalController);

    public bestellung = this.app.bestellung;
    public aufnehmer = this.app.aufnehmer;

    public selectedProduktkategorie = signal<Produktkategorie>(null);
    public filtredProdukteinteilungenToDisplay = signal<Produkteinteilung[]>([]);
    public produktkategorien = this.data.produktkategorien;

    constructor() {

        effect(() => {
            if (this.selectedProduktkategorie() == null) {
                this.selectProduktkategorie(this.produktkategorien()[0]);
            }

            this.filtredProdukteinteilungenToDisplay.set(this.data.produktkategorien().find(produktkategorie => produktkategorie.id == this.selectedProduktkategorie()?.id)?.produkteinteilungen ?? []);
        }, { allowSignalWrites: true });
    }

    /*******************************************************************************
    *** Tischauswahl
    *******************************************************************************/

    selectTisch(tisch: Tisch) {
        this.bestellung().tisch = tisch;
        this.bestellung().status = 'bestellpositionen';
    }

    changeTisch() {
        this.bestellung().status = 'tischauswahl';
    }

    /*******************************************************************************
    *** Aufnahme der Bestellpositionen
    *******************************************************************************/

    selectProduktkategorie(produktkategorie: Produktkategorie) {
        this.selectedProduktkategorie.set(produktkategorie);
    }

    addBestellposition(produkt: Produkt, form: string, event: any) {

        // Verhindert dass ein Extra-Einfügen eine doppeltes Clicken des wrapper-Elements darunter verursacht
        event.stopPropagation();

        // hochzählen oder neue Zeile (= neue Bestellposition)
        let added: boolean = false;

        if (form == 'standard') {

            for (let bp of this.bestellung().bestellpositionen) {
                if (
                    bp.produkt.id == produkt.id &&
                    bp.display.eigenschaften.mit.length == 0 &&  // <= nur unmodifiziertes Produkt automatisch hochzählen
                    bp.display.eigenschaften.ohne.length == 0
                ) {
                    bp.anzahl++;
                    added = true;
                    break;
                }
            }
        }

        if (!added) {
            this.bestellung().addBestellposition(new Bestellposition(produkt));
        }
    }

    displayEuroNumber(value: any) {
        return "€ " + String(parseFloat(value).toFixed(2)).replace(".", ",");
    }

    async editBestellungsposition(bestellposition: Bestellposition, nonReverseIndex: number) {

        let reverseIndex = this.bestellung().bestellpositionen.length - 1 - nonReverseIndex;

        const modal = await this.modalController.create({
            component: BestellungspositionEditModalComponent,
            componentProps: {
                bestellposition: bestellposition,
                index: reverseIndex
            },
            cssClass: 'classic-modal',
            showBackdrop: true,
            backdropDismiss: false,
            animated: true
        });

        modal.onDidDismiss()
            .then((data) => {
                bestellposition.display.eigenschaften.mit = [];
                bestellposition.display.eigenschaften.ohne = [];

                bestellposition.calc_correction = 0.00;

                for (let e of data.data.eigenschaften) {
                    if (e.in_produkt_enthalten == 0 && e.aktiv == 1) {
                        if (parseFloat(e.preis) != 0) {

                            bestellposition.display.eigenschaften.mit.push(e.name + " (" + bestellposition.anzahl + "x = +" + this.displayEuroNumber(bestellposition.anzahl * e.preis) + ")");
                        } else {
                            bestellposition.display.eigenschaften.mit.push(e.name);
                        }
                        bestellposition.calc_correction += (bestellposition.anzahl * parseFloat(e.preis));

                    } else if (e.in_produkt_enthalten == 1 && e.aktiv == 0) {
                        if (parseFloat(e.preis) != 0) {
                            bestellposition.display.eigenschaften.ohne.push(e.name + " (" + bestellposition.anzahl + "x = -" + this.displayEuroNumber(bestellposition.anzahl * e.preis) + ")");
                        } else {
                            bestellposition.display.eigenschaften.ohne.push(e.name);
                        }
                        bestellposition.calc_correction -= (bestellposition.anzahl * parseFloat(e.preis));
                    }
                }
            });

        return modal.present();
    }

    async kontrolliereBestellung() {

        const modal = await this.modalController.create({
            component: BestellungKontrolleModalComponent,
            componentProps: {
                bestellung: this.app.bestellung()
            },
            cssClass: 'classic-modal',
            showBackdrop: true,
            backdropDismiss: false,
            animated: true
        });

        modal.onDidDismiss()
            .then((data) => {
                if (data.data) {
                    this.app.createBestellung();
                }

            });

        return modal.present();
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
