import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { IonButton, IonContent, IonFooter, IonIcon, IonItem, IonItemDivider, IonLabel, IonList } from '@ionic/angular/standalone';
import { AppService } from '../../../../data/app.service';
import { DataService } from '../../../../data/data.service';
import { FrontendService } from '../../../../data/frontend.service';
import { BestellungKontrolleModalComponent } from '../../../../feature/bestellung-kontrolle/bestellung-kontrolle-modal.component';
import { EuroPreisPipe } from '../../../../misc/euro-preis.pipe';
import { Bestellposition } from '../../../../model/business/bestellposition.model';
import { ProduktDto } from '../../../../model/dto/produkt.dto';
import { ProdukteinteilungDto } from '../../../../model/dto/produkteinteilung.dto';
import { ProduktkategorieDto } from '../../../../model/dto/produktkategorie.dto';

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

    public readonly selectedProduktkategorie = signal<ProduktkategorieDto | null>(null);
    public readonly filtredProdukteinteilungenToDisplay = signal<ProdukteinteilungDto[]>([]);

    constructor() {
        effect(() => {
            if (this.selectedProduktkategorie() == null) {
                this.selectProduktkategorie(this.produktkategorien()[0]);
            }

            this.filtredProdukteinteilungenToDisplay.set(this.data.produktkategorien().find((p) => p.id == this.selectedProduktkategorie()?.id)?.produkteinteilungen ?? []);
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

    selectProduktkategorie(produktkategorie: ProduktkategorieDto) {
        this.selectedProduktkategorie.set(produktkategorie);
    }

    addBestellposition(produkt: ProduktDto, form: string, event: any) {
        // Verhindert dass ein Extra-Einfügen eine doppeltes Clicken des wrapper-Elements darunter verursacht
        event.stopPropagation();

        // hochzählen oder neue Zeile (= neue Bestellposition)
        let added: boolean = false;

        if (form == 'standard') {
            for (let bp of this.bestellung().bestellpositionen()) {
                // nur unmodifiziertes Produkt automatisch hochzählen
                if (bp.produkt.id == produkt.id && bp.isUnmodified()) {
                    bp.anzahl.update((a) => a + 1);
                    added = true;
                    break;
                }
            }
        }

        if (!added) {
            this.bestellung.update((bestellung) => {
                bestellung.addBestellposition(Bestellposition.fromProduct(produkt));
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
