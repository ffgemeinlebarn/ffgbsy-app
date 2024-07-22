import { Component, computed, ElementRef, inject, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { IonButton, IonButtons, IonChip, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenuButton, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { map } from 'rxjs';
import { EuroPreisPipe } from 'src/app/pipes/euro-preis/euro-preis.pipe';
import { DruckerService } from 'src/app/services/drucker/drucker.service';
import { EigenschaftenService } from 'src/app/services/eigenschaften/eigenschaften.service';
import { ProdukteService } from 'src/app/services/produkte/produkte.service';

@Component({
    selector: 'ffgbsy-angebot-uebersicht',
    templateUrl: './angebot-uebersicht.page.html',
    styleUrls: ['./angebot-uebersicht.page.scss'],
    standalone: true,
    imports: [EuroPreisPipe, IonChip, IonLabel, IonItem, IonList, IonButtons, IonIcon, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton]
})
export class AngebotUebersichtPage {
    private produkteService = inject(ProdukteService);
    private druckerService = inject(DruckerService);
    private eigenschaftenService = inject(EigenschaftenService);

    private printElement = viewChild<ElementRef>('print');

    public produkte = toSignal(this.produkteService.readAll());
    public eigenschaften = toSignal(this.eigenschaftenService.readAll().pipe(map(list => list.sort((a, b) => a.id - b.id))));
    public eigenschaftenRow1 = computed(() => this.eigenschaften()?.filter((_, i) => i % 2 == 0));
    public eigenschaftenRow2 = computed(() => this.eigenschaften()?.filter((_, i) => i % 2 == 1));
    public drucker = toSignal(this.druckerService.readAll());

    public invokePrintingDialog() {
        window.document.body.innerHTML = this.printElement().nativeElement.innerHTML;
        setTimeout(() => {
            window.print();
            window.location.reload();
        }, 300);
    }
}
