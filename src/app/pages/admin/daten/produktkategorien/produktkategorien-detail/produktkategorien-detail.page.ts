import { Component, effect, inject, input, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { IonBackButton, IonButton, IonButtons, IonChip, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonItemDivider, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonSelect, IonSelectOption, IonSpinner, IonTitle, IonToggle, IonToolbar, ModalController } from "@ionic/angular/standalone";
import { Eigenschaft } from 'src/app/classes/eigenschaft.interface';
import { Produktkategorie } from 'src/app/classes/produktkategorie.class';
import { PageSpinnerComponent } from 'src/app/components/page-spinner/page-spinner.component';
import { SelectEigenschaftModalComponent } from 'src/app/modals/select-eigenschaft-modal/select-eigenschaft-modal.component';
import { EuroPreisPipe } from 'src/app/pipes/euro-preis/euro-preis.pipe';
import { DruckerService } from 'src/app/services/drucker/drucker.service';
import { FrontendService } from 'src/app/services/frontend/frontend.service';
import { ProduktbereicheService } from 'src/app/services/produktbereiche/produktbereiche.service';
import { ProduktkategorienService } from 'src/app/services/produktkategorien/produktkategorien.service';

@Component({
    selector: 'ffgbsy-produktkategorien-detail',
    templateUrl: './produktkategorien-detail.page.html',
    styleUrls: ['./produktkategorien-detail.page.scss'],
    standalone: true,
    imports: [
        IonChip,
        IonSpinner,
        IonItemDivider,
        IonItemOptions,
        IonItemSliding,
        IonItemOption,
        IonLabel,
        IonList,
        IonItem,
        IonContent,
        IonIcon,
        IonButton,
        IonButtons,
        IonTitle,
        IonBackButton,
        IonToolbar,
        IonHeader,
        IonToggle,
        IonInput,
        IonSelect,
        IonSelectOption,
        FormsModule,
        ReactiveFormsModule,
        PageSpinnerComponent,
        EuroPreisPipe
    ],
})
export class ProduktkategorienDetailPage {
    private produktkategorienService = inject(ProduktkategorienService);
    private produktbereicheService = inject(ProduktbereicheService);
    private druckerService = inject(DruckerService);
    private frontendService = inject(FrontendService);
    private formBuilder = inject(FormBuilder);
    private modalController = inject(ModalController);
    private alertController = inject(AlertController);

    public id = input.required<number>();

    public drucker = toSignal(this.druckerService.readAll());
    public produktbereiche = toSignal(this.produktbereicheService.readAll());
    public produktkategorie = signal<Produktkategorie>(null);

    public form: FormGroup = this.formBuilder.group({
        name: ["", [Validators.required, Validators.minLength(1)]],
        color: [""],
        drucker_id_level_1: [null],
        sortierindex: [100, [Validators.min(0)]],
        produktbereiche_id: [null, [Validators.nullValidator]],
        eigenschaften: [[]]
    });

    constructor() {
        effect(() => this.produktkategorienService.read(this.id()).subscribe((produktkategorie: Produktkategorie) => this.setEntity(produktkategorie)));
    }

    private setEntity(produktkategorie: Produktkategorie) {
        this.produktkategorie.set(produktkategorie);
        this.form.patchValue(produktkategorie);
    }

    public removeEigenschaft(eigenschaft: Eigenschaft) {
        this.form.controls.eigenschaften.setValue(this.form.controls.eigenschaften.value.filter(e => e.id !== eigenschaft.id));
        this.produktkategorie.set({ ...this.produktkategorie(), eigenschaften: this.form.controls.eigenschaften.value });
    }

    public toggleEigenschaftEnthalten(eigenschaft: Eigenschaft) {
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
        const eigenschaft: Eigenschaft = await (await modal.onWillDismiss()).data;

        if (eigenschaft) {
            const alert = await this.alertController.create({
                backdropDismiss: false,
                header: eigenschaft.name,
                message: "Ist die Eigenschaft im Produkt enthalten?",
                buttons: [
                    {
                        text: 'Nein',
                        handler: () => alert.dismiss(false)
                    }, {
                        text: 'Ja',
                        handler: () => alert.dismiss(true)
                    }
                ]
            });
            await alert.present();
            eigenschaft.in_produkt_enthalten = await (await alert.onWillDismiss()).data;

            if (!this.produktkategorie().eigenschaften.find(e => e.id === eigenschaft.id)) {
                this.produktkategorie.update((produktkategorie) => {
                    produktkategorie.eigenschaften.push(eigenschaft);
                    return produktkategorie;
                });
            }
        }
    }

    public save() {
        const updated = { ...this.produktkategorie(), ...this.form.value };
        console.debug("ProduktkategorienDetailPage", "save(), Updated Produktkategorie:", updated);
        this.produktkategorienService
            .update(updated)
            .subscribe(produktkategorie => {
                this.frontendService.showToast(`${produktkategorie.name} wurde erfolgreich gespeichert!`);
                this.setEntity(produktkategorie);
            });
    }
}
