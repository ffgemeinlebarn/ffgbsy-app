import { Component, effect, inject, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonList,
    IonMenuButton,
    IonSearchbar,
    IonTitle,
    IonToolbar,
    ViewDidEnter,
} from '@ionic/angular/standalone';
import { Produkt } from 'src/app/classes/produkt.class';
import { PageSpinnerComponent } from 'src/app/components/page-spinner/page-spinner.component';
import { ProdukteService } from 'src/app/data/produkte.service';
import { EuroPreisPipe } from 'src/app/pipes/euro-preis/euro-preis.pipe';

@Component({
    selector: 'ffgbsy-produkte-list',
    templateUrl: './produkte-list.page.html',
    styleUrls: ['./produkte-list.page.scss'],
    imports: [
        IonList,
        IonContent,
        IonSearchbar,
        IonTitle,
        IonToolbar,
        IonHeader,
        IonMenuButton,
        IonButtons,
        IonButton,
        IonIcon,
        PageSpinnerComponent,
        RouterLink,
        EuroPreisPipe,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class ProdukteListPage implements ViewDidEnter {
    private produkteService = inject(ProdukteService);

    public search = new FormControl('');
    public produkte = signal<Produkt[]>(null);
    public produkteFiltred = signal<Produkt[]>(null);

    constructor() {
        effect(() => this.produkteFiltred.set(this.produkte()), {
            allowSignalWrites: true,
        });
    }

    public handleSearchInput(event: any) {
        this.filter(event.target.value.toLowerCase());
    }

    private filter(query: string) {
        this.produkteFiltred.set(
            this.produkte().filter((produkt) =>
                produkt.name.toLowerCase().includes(query)
            )
        );
    }

    ionViewDidEnter(): void {
        this.produkte.set(null);
        this.produkteService.readAll().subscribe((produkte) => {
            this.produkte.set(produkte);
            this.search.setValue('');
            this.filter('');
        });
    }
}
