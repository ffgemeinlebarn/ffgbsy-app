import { Component, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Produkt } from 'src/app/classes/produkt.class';
import { EuroPreisPipe } from 'src/app/pipes/euro-preis/euro-preis.pipe';
import { ProdukteService } from 'src/app/services/produkte/produkte.service';
@Component({
    selector: 'ffgbsy-produkte-list',
    templateUrl: './produkte-list.page.html',
    styleUrls: ['./produkte-list.page.scss'],
    standalone: true,
    imports: [
        IonicModule,
        RouterLink,
        EuroPreisPipe
    ],
})
export class ProdukteListPage {
    private produkteService = inject(ProdukteService);

    public produkte = toSignal(this.produkteService.readAll());
    public produkteFiltred = signal<Produkt[]>([]);

    constructor() {
        effect(() => this.produkteFiltred.set(this.produkte()), { allowSignalWrites: true });
    }

    public handleSearchInput(event: any) {
        const query = event.target.value.toLowerCase()
        this.produkteFiltred.set(this.produkte().filter(produkt => produkt.name.toLowerCase().includes(query)));
    }
}
