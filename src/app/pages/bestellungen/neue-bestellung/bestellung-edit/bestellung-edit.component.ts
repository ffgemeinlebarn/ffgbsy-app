import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { IonButton, IonContent, IonFooter, IonIcon, IonItem, IonItemDivider, IonLabel, IonList } from '@ionic/angular/standalone';
import { AppService } from '../../../../data/app.service';
import { DataService } from '../../../../data/data.service';
import { FrontendService } from '../../../../data/frontend.service';
import { BestellungKontrolleModalComponent } from '../../../../feature/bestellung-kontrolle/bestellung-kontrolle-modal.component';
import { EuroPreisPipe } from '../../../../misc/euro-preis.pipe';
import { Bestellposition } from '../../../../model/bestellposition.model';
import { IProdukt } from '../../../../model/i-produkt.interface';
import { IProdukteinteilung } from '../../../../model/i-produkteinteilung.interface';
import { IProduktkategorie } from '../../../../model/i-produktkategorie.interface';

@Component({
    selector: 'ffgbsy-bestellung-edit',
    templateUrl: './bestellung-edit.component.html',
    styleUrls: ['./bestellung-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [IonItemDivider, IonItem, IonIcon, IonContent, IonFooter, IonButton, IonList, IonItem, IonLabel, IonItemDivider, NgClass, EuroPreisPipe],
})
export class BestellungEditComponent {
    private readonly app = inject(AppService);
    private readonly data = inject(DataService);
    private readonly frontendService = inject(FrontendService);

    public readonly bestellung = this.app.bestellung;
    public readonly aufnehmer = this.app.aufnehmer;
    public readonly produktkategorien = this.data.produktkategorien;

    public readonly selectedProduktkategorie = signal<IProduktkategorie | null>(null);
    public readonly filtredProdukteinteilungenToDisplay = signal<IProdukteinteilung[]>([]);

    constructor() {
        effect(() => {
            if (this.selectedProduktkategorie() == null) {
                this.selectProduktkategorie(this.produktkategorien()[0]);
            }

            this.filtredProdukteinteilungenToDisplay.set(
                this.data.produktkategorien().find((produktkategorie) => produktkategorie.id == this.selectedProduktkategorie()?.id)?.produkteinteilungen ?? [],
            );
        });
    }

    public changeTisch() {
        this.bestellung.update((bestellung) => {
            bestellung.status = 'tischauswahl';
            return bestellung;
        });
    }

    /*******************************************************************************
     *** Aufnahme der Bestellpositionen
     *******************************************************************************/

    selectProduktkategorie(produktkategorie: IProduktkategorie) {
        this.selectedProduktkategorie.set(produktkategorie);
    }

    addBestellposition(produkt: IProdukt, form: string, event: any) {
        // Verhindert dass ein Extra-Einfügen eine doppeltes Clicken des wrapper-Elements darunter verursacht
        event.stopPropagation();

        // hochzählen oder neue Zeile (= neue Bestellposition)
        let added: boolean = false;

        if (form == 'standard') {
            for (let bp of this.bestellung().bestellpositionen) {
                if (
                    bp.produkt.id == produkt.id &&
                    bp.display.eigenschaften.mit.length == 0 && // <= nur unmodifiziertes Produkt automatisch hochzählen
                    bp.display.eigenschaften.ohne.length == 0
                ) {
                    bp.anzahl++;
                    added = true;
                    break;
                }
            }
        }

        if (!added) {
            this.bestellung.update((bestellung) => {
                bestellung.addBestellposition(new Bestellposition(produkt));
                return bestellung;
            });
        }
    }

    public editBestellungsposition(bestellposition: Bestellposition) {
        this.app.editBestellposition(bestellposition);
    }

    public kontrolliereBestellung() {
        this.frontendService.showModal(BestellungKontrolleModalComponent).subscribe((data) => {
            if (data.data) {
                this.app.createBestellung();
            }
        });
    }
}
