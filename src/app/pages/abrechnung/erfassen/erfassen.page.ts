import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IonBadge, IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenuButton, IonSpinner, IonTitle, IonToolbar, ModalController } from '@ionic/angular/standalone';
import { from, map, mergeMap } from 'rxjs';
import { AppService } from '../../../data/app.service';
import { DataService } from '../../../data/data.service';
import { SelectAufnehmerModalComponent } from '../../../feature/select-aufnehmer-modal/select-aufnehmer-modal.component';
import { EuroPreisPipe } from '../../../misc/euro-preis.pipe';
import { Abrechnung } from '../../../model/business/abrechnung.model';
import { PersonDto } from '../../../model/dto/person.dto';

@Component({
    selector: 'ffgbsy-abrechnen-erfassen',
    templateUrl: './erfassen.page.html',
    styleUrls: ['./erfassen.page.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [IonIcon, IonButtons, IonButton, IonSpinner, IonFooter, IonBadge, IonLabel, IonItem, IonList, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, EuroPreisPipe],
})
export class AbrechnungErfassenPage {
    private readonly appService = inject(AppService);
    private readonly data = inject(DataService);
    private readonly modalController = inject(ModalController);

    public readonly personen = this.data.personen;
    public readonly abrechnung = this.appService.abrechnung;

    public cancel() {
        this.abrechnung.set(null);
    }

    public selectKellner() {
        from(
            this.modalController.create({
                component: SelectAufnehmerModalComponent,
                componentProps: {
                    showAufnehmer: false,
                    showKellner: true,
                },
                canDismiss: true,
                breakpoints: [0.1, 0.5, 1],
                initialBreakpoint: 1,
            }),
        )
            .pipe(
                mergeMap((modal) => from(modal.present()).pipe(map(() => modal))),
                mergeMap((modal) => from(modal.onDidDismiss())),
            )
            .subscribe((result: { data: PersonDto; role: 'select' | 'cancel' }) => {
                if (result.role == 'select' && result.data) {
                    if (this.abrechnung()) {
                        this.abrechnung.update((a) => {
                            a.person = result.data;
                            return a;
                        });
                    } else {
                        this.abrechnung.set(new Abrechnung(result.data));
                    }
                }
            });
    }
}
