import { JsonPipe } from '@angular/common';
import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { IonButton, IonButtons, IonChip, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenuButton, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { EuroPreisPipe } from 'src/app/pipes/euro-preis/euro-preis.pipe';
import { DruckerService } from 'src/app/services/drucker/drucker.service';
import { ProdukteService } from 'src/app/services/produkte/produkte.service';

@Component({
    selector: 'ffgbsy-angebot-uebersicht',
    templateUrl: './angebot-uebersicht.page.html',
    styleUrls: ['./angebot-uebersicht.page.scss'],
    standalone: true,
    imports: [EuroPreisPipe, JsonPipe, IonChip, IonLabel, IonItem, IonList, IonButtons, IonIcon, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton]
})
export class AngebotUebersichtPage {
    private produkteService = inject(ProdukteService);
    private druckerService = inject(DruckerService);

    private printTable = viewChild<ElementRef>('print');

    public produkte = toSignal(this.produkteService.readAll());
    public drucker = toSignal(this.druckerService.readAll());

    public invokePrintingDialog() {
        window.document.body.innerHTML = this.printTable().nativeElement.outerHTML;
        setTimeout(() => {
            window.print();
            window.location.reload();
        }, 300);
    }
}
