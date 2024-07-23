import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonList, IonMenuButton, IonTitle, IonToolbar } from "@ionic/angular/standalone";
import { PageSpinnerComponent } from 'src/app/components/page-spinner/page-spinner.component';
import { GrundprodukteService } from 'src/app/services/grundprodukte/grundprodukte.service';

@Component({
    selector: 'ffgbsy-grundprodukte',
    templateUrl: './grundprodukte.page.html',
    styleUrls: ['./grundprodukte.page.scss'],
    standalone: true,
    imports: [IonButton, IonButtons, IonIcon,
        IonContent,
        IonToolbar,
        IonTitle,
        IonList,
        IonHeader,
        RouterLink,
        IonMenuButton,
        PageSpinnerComponent
    ],
})
export class GrundproduktePage {
    private grundProdukteService = inject(GrundprodukteService);

    public grundprodukte = toSignal(this.grundProdukteService.readAll());
}
