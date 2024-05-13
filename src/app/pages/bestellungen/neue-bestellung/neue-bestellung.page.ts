import { Component, OnInit, computed, effect, inject, signal } from '@angular/core';
import { BestellungenHandlerService } from 'src/app/services/bestellungen/bestellungen-handler.service';
import { DataService } from 'src/app/services/data/data.service';
import { ModalController, IonicModule } from '@ionic/angular';
import { Tisch } from 'src/app/classes/tisch.class';
import { Produktkategorie } from 'src/app/classes/produktkategorie.class';
import { Produkt } from 'src/app/classes/produkt.class';
import { Bestellposition } from 'src/app/classes/bestellposition.class';
import { BestellungspositionEditModalComponent } from 'src/app/modals/bestellungsposition-edit-modal/bestellungsposition-edit-modal.component';
import { BestellungKontrolleModalComponent } from 'src/app/modals/bestellung-kontrolle/bestellung-kontrolle-modal.component';
import { FrontendService } from 'src/app/services/frontend/frontend.service';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { EuroPreisPipe } from '../../../pipes/euro-preis/euro-preis.pipe';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { AufnehmerService } from 'src/app/services/aufnehmer/aufnehmer.service';
import { AppService } from 'src/app/services/app/app.service';
import { Bestellung } from 'src/app/classes/bestellung.class';

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
    ],
})
export class NeueBestellungPage {

    private app = inject(AppService);
    bestellungsHandler = inject(BestellungenHandlerService);
    private data = inject(DataService);
    frontend = inject(FrontendService);
    notification = inject(NotificationService);
    modalController = inject(ModalController);

    public bestellung = this.app.bestellung;
    public aufnehmer = this.app.aufnehmer;
    public filterTischkategorieId = signal<number>(null);
    public filterProduktkategorie = signal<Produktkategorie>(null);

    public produktkategorien = this.data.produktkategorien;

    constructor() {
        effect(
            () => this.filterTischkategorieId.set(this.data.tischkategorien()[0]?.id ?? null),
            { allowSignalWrites: true }
        );
        effect(
            () => this.filterProduktkategorie.set(this.data.produktkategorien()[0] ?? null),
            { allowSignalWrites: true }
        );
    }

    changeFilterTischkategorieId(tischkategorie_id: number) {
        this.filterTischkategorieId.set(tischkategorie_id);
    }

    public selectAufnehmer() {
        this.app.showSelectAufnehmerModal();
    }

    public starteBestellvorgang() {
        this.app.createNewBestellung();
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

    changeFilterProduktkategorie(produktkategorie: Produktkategorie) {
        this.filterProduktkategorie.set(produktkategorie);
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
                    this.bestellungsHandler.sendNeubestellungBestellung();
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
