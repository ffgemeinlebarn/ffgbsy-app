import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { IonContent, IonHeader, IonList, IonMenuButton, IonTitle, IonToolbar } from "@ionic/angular/standalone";
import { GrundprodukteService } from 'src/app/services/grundprodukte/grundprodukte.service';

@Component({
    selector: 'ffgbsy-grundprodukte',
    templateUrl: './grundprodukte.page.html',
    styleUrls: ['./grundprodukte.page.scss'],
    standalone: true,
    imports: [
        IonContent,
        IonToolbar,
        IonTitle,
        IonList,
        IonHeader,
        RouterLink,
        IonMenuButton
    ],
})
export class GrundproduktePage {
    private grundProdukteService = inject(GrundprodukteService);

    public grundprodukte = toSignal(this.grundProdukteService.readAll());
}
