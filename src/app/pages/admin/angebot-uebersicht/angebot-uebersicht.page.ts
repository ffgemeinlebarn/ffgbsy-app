import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonMenuButton, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { map } from 'rxjs';
import { DruckerApiService } from '../../../data/api/drucker-api.service';
import { EigenschaftenApiService } from '../../../data/api/eigenschaften-api.service';
import { ProdukteApiService } from '../../../data/api/produkte-api.service';
import { EuroPreisPipe } from '../../../misc/euro-preis.pipe';
@Component({
    selector: 'ffgbsy-angebot-uebersicht',
    templateUrl: './angebot-uebersicht.page.html',
    styleUrls: ['./angebot-uebersicht.page.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [EuroPreisPipe, IonButtons, IonIcon, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton],
})
export class AngebotUebersichtPage {
    private readonly produkteApiService = inject(ProdukteApiService);
    private readonly druckerApiService = inject(DruckerApiService);
    private readonly eigenschaftenApiService = inject(EigenschaftenApiService);

    private printElement = viewChild<ElementRef>('print');

    public produkte = toSignal(this.produkteApiService.readAll());
    public eigenschaften = toSignal(this.eigenschaftenApiService.readAll().pipe(map((list) => list.sort((a, b) => a.id - b.id))));
    public eigenschaftenRow1 = computed(() => this.eigenschaften()?.filter((_, i) => i % 2 == 0));
    public eigenschaftenRow2 = computed(() => this.eigenschaften()?.filter((_, i) => i % 2 == 1));
    public drucker = toSignal(this.druckerApiService.readAll());

    public invokePrintingDialog() {
        window.document.body.innerHTML = this.printElement().nativeElement.innerHTML;
        setTimeout(() => {
            window.print();
            window.location.reload();
        }, 300);
    }
}
