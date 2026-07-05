import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { IonBackButton, IonButton, IonButtons, IonChip, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonItemDivider, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonSelect, IonSelectOption, IonTitle, IonToolbar, ModalController } from '@ionic/angular/standalone';
import { DruckerApiService } from '../../../../../data/api/drucker-api.service';
import { ProduktbereicheApiService } from '../../../../../data/api/produktbereiche-api.service';
import { ProduktkategorienApiService } from '../../../../../data/api/produktkategorien-api.service';
import { FrontendService } from '../../../../../data/frontend.service';
import { SelectEigenschaftModalComponent } from '../../../../../feature/select-eigenschaft-modal/select-eigenschaft-modal.component';
import { EuroPreisPipe } from '../../../../../misc/euro-preis.pipe';
import { EigenschaftDto } from '../../../../../model/dto/eigenschaft.dto';
import { ProduktDto } from '../../../../../model/dto/produktkategorie.dto';
import { PageSpinnerComponent } from '../../../../../ui/page-spinner/page-spinner.component';

@Component({
    selector: 'ffgbsy-produktkategorien-detail',
    templateUrl: './produktkategorien-detail.page.html',
    styleUrls: ['./produktkategorien-detail.page.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [IonChip, IonItemDivider, IonItemOptions, IonItemSliding, IonItemOption, IonLabel, IonList, IonItem, IonContent, IonIcon, IonButton, IonButtons, IonTitle, IonBackButton, IonToolbar, IonHeader, IonInput, IonSelect, IonSelectOption, FormsModule, ReactiveFormsModule, PageSpinnerComponent, EuroPreisPipe],
})
export class ProduktkategorienDetailPage {
    private produktkategorienApiService = inject(ProduktkategorienApiService);
    private produktbereicheApiService = inject(ProduktbereicheApiService);
    private druckerApiService = inject(DruckerApiService);
    private frontendService = inject(FrontendService);
    private formBuilder = inject(FormBuilder);
    private modalController = inject(ModalController);
    private alertController = inject(AlertController);

    public id = input.required<number>();

    public drucker = toSignal(this.druckerApiService.readAll());
    public produktbereiche = toSignal(this.produktbereicheApiService.readAll());
    public produktkategorie = signal<ProduktDto>(null);

    public form: FormGroup = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(1)]],
        color: [''],
        drucker_id_level_1: [null],
        sortierindex: [100, [Validators.min(0)]],
        produktbereiche_id: [null, [Validators.nullValidator]],
        eigenschaften: [[]],
    });

    constructor() {
        effect(() => this.produktkategorienApiService.read(this.id()).subscribe((produktkategorie: ProduktDto) => this.setEntity(produktkategorie)));
    }

    private setEntity(produktkategorie: ProduktDto) {
        this.produktkategorie.set(produktkategorie);
        this.form.patchValue(produktkategorie);
    }

    public removeEigenschaft(eigenschaft: EigenschaftDto) {
        this.form.controls.eigenschaften.setValue(this.form.controls.eigenschaften.value.filter((e) => e.id !== eigenschaft.id));
        this.produktkategorie.set({
            ...this.produktkategorie(),
            eigenschaften: this.form.controls.eigenschaften.value,
        });
    }

    public toggleEigenschaftEnthalten(eigenschaft: EigenschaftDto) {
        eigenschaft.in_produkt_enthalten = !eigenschaft.in_produkt_enthalten;
    }

    public async showEigenschaftSelectionModal() {
        const modal = await this.modalController.create({
            component: SelectEigenschaftModalComponent,
            canDismiss: true,
            breakpoints: [0.1, 0.5, 1],
            initialBreakpoint: 1,
        });
        await modal.present();
        const eigenschaft: EigenschaftDto = await (await modal.onWillDismiss()).data;

        if (eigenschaft) {
            const alert = await this.alertController.create({
                backdropDismiss: false,
                header: eigenschaft.name,
                message: 'Ist die Eigenschaft im Produkt enthalten?',
                buttons: [
                    {
                        text: 'Nein',
                        handler: () => alert.dismiss(false),
                    },
                    {
                        text: 'Ja',
                        handler: () => alert.dismiss(true),
                    },
                ],
            });
            await alert.present();
            eigenschaft.in_produkt_enthalten = await (await alert.onWillDismiss()).data;

            if (!this.produktkategorie().eigenschaften.find((e) => e.id === eigenschaft.id)) {
                this.produktkategorie.update((produktkategorie) => {
                    produktkategorie.eigenschaften.push(eigenschaft);
                    return produktkategorie;
                });
            }
        }
    }

    public save() {
        const updated = { ...this.produktkategorie(), ...this.form.value };
        console.debug('[FFGBSY]', 'ProduktkategorienDetailPage', 'save(), Updated Produktkategorie:', updated);
        this.produktkategorienApiService.update(updated).subscribe((produktkategorie) => {
            this.frontendService.showToast(`${produktkategorie.name} wurde erfolgreich gespeichert!`);
            this.setEntity(produktkategorie);
        });
    }
}
