import { Component, OnInit, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { IonItem, IonLabel, IonList, ModalController } from '@ionic/angular/standalone';
import { EuroPreisPipe } from 'src/app/pipes/euro-preis/euro-preis.pipe';
import { EigenschaftenService } from 'src/app/services/eigenschaften/eigenschaften.service';

@Component({
    selector: 'app-select-eigenschaft-modal',
    templateUrl: './select-eigenschaft-modal.component.html',
    styleUrls: ['./select-eigenschaft-modal.component.scss'],
    standalone: true,
    imports: [
        IonList,
        IonItem,
        IonLabel,
        EuroPreisPipe
    ]
})
export class SelectEigenschaftModalComponent {
    private eigenschaftenService = inject(EigenschaftenService);
    private modalController = inject(ModalController);

    public eigenschaften = toSignal(this.eigenschaftenService.readAll());

    public selectEigenschaft(eigenschaft) {
        this.modalController.dismiss(eigenschaft);
    }
}
