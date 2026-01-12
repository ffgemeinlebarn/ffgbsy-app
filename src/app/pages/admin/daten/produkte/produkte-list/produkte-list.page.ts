import { Component, effect, inject, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonList, IonMenuButton, IonSearchbar, IonTitle, IonToolbar, ViewDidEnter } from '@ionic/angular/standalone';
import { ProdukteApiService } from 'src/app/data/api/produkte-api.service';
import { EuroPreisPipe } from 'src/app/misc/euro-preis.pipe';
import { IProdukt } from 'src/app/model/i-produkt.interface';
import { PageSpinnerComponent } from 'src/app/ui/page-spinner/page-spinner.component';

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
    private produkteApiService = inject(ProdukteApiService);

    public search = new FormControl('');
    public produkte = signal<IProdukt[]>(null);
    public produkteFiltred = signal<IProdukt[]>(null);

    constructor() {
        effect(() => this.produkteFiltred.set(this.produkte()));
    }

    public handleSearchInput(event: any) {
        this.filter(event.target.value.toLowerCase());
    }

    private filter(query: string) {
        this.produkteFiltred.set(this.produkte().filter((produkt) => produkt.name.toLowerCase().includes(query)));
    }

    ionViewDidEnter(): void {
        this.produkte.set(null);
        this.produkteApiService.readAll().subscribe((produkte) => {
            this.produkte.set(produkte);
            this.search.setValue('');
            this.filter('');
        });
    }
}
