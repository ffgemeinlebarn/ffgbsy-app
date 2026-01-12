import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { IonItem, IonLabel, IonList, ModalController } from '@ionic/angular/standalone';
import { EigenschaftenApiService } from 'src/app/data/api/eigenschaften-api.service';
import { EuroPreisPipe } from 'src/app/misc/euro-preis.pipe';

@Component({
    selector: 'app-select-eigenschaft-modal',
    templateUrl: './select-eigenschaft-modal.component.html',
    styleUrls: ['./select-eigenschaft-modal.component.scss'],
    standalone: true,
    imports: [IonList, IonItem, IonLabel, EuroPreisPipe],
})
export class SelectEigenschaftModalComponent {
    private eigenschaftenApiService = inject(EigenschaftenApiService);
    private modalController = inject(ModalController);

    public eigenschaften = toSignal(this.eigenschaftenApiService.readAll());

    public selectEigenschaft(eigenschaft) {
        this.modalController.dismiss(eigenschaft);
    }
}
