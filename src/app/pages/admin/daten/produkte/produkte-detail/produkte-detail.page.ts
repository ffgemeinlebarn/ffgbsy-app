import { Component, effect, inject, input, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertController, IonBackButton, IonButton, IonButtons, IonChip, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonSelect, IonSelectOption, IonTitle, IonToggle, IonToolbar, ModalController } from '@ionic/angular/standalone';
import { IEigenschaft } from 'src/app/classes/i-eigenschaft.interface';
import { Produkt } from 'src/app/classes/produkt.class';
import { PageSpinnerComponent } from 'src/app/components/page-spinner/page-spinner.component';
import { SelectEigenschaftModalComponent } from 'src/app/modals/select-eigenschaft-modal/select-eigenschaft-modal.component';
import { EuroPreisPipe } from 'src/app/pipes/euro-preis/euro-preis.pipe';
import { DruckerService } from 'src/app/services/drucker/drucker.service';
import { FrontendService } from 'src/app/services/frontend/frontend.service';
import { ProdukteService } from 'src/app/services/produkte/produkte.service';

@Component({
    selector: 'ffgbsy-produkte-detail',
    templateUrl: './produkte-detail.page.html',
    styleUrls: ['./produkte-detail.page.scss'],
    standalone: true,
    imports: [
        IonItemDivider,
        IonChip,
        IonItem,
        IonLabel,
        IonList,
        IonContent,
        IonIcon,
        IonButtons,
        IonButton,
        IonTitle,
        IonBackButton,
        IonHeader,
        IonToolbar,
        IonSelect,
        IonSelectOption,
        IonToggle,
        IonInput,
        FormsModule,
        EuroPreisPipe,
        ReactiveFormsModule,
        PageSpinnerComponent
    ],
})
export class ProdukteDetailPage {
    private frontendService = inject(FrontendService);
    private produkteService = inject(ProdukteService);
    private druckerService = inject(DruckerService);
    private formBuilder = inject(FormBuilder);
    private modalController = inject(ModalController);
    private alertController = inject(AlertController);

    public id = input.required<number>();
    public produkt = signal<Produkt>(null);
    public drucker = toSignal(this.druckerService.readAll());
    public form: FormGroup = this.formBuilder.group({
        name: ["", [Validators.required, Validators.minLength(1)]],
        formal_name: ["", [Validators.required, Validators.minLength(1)]],
        preis: [0, [Validators.required, Validators.min(0)]],
        aktiv: [false, [Validators.required]],
        celebration_active: [false, [Validators.required]],
        celebration_last: [0, [Validators.required]],
        drucker_id_level_2: [null],
        eigenschaften: [[]],
    });

    constructor() {
        effect(() => this.load(this.id()));
    }

    private load(id: number) {
        this.produkteService.read(id).subscribe((produkt) => {
            this.produkt.set(produkt);
            this.form.patchValue(produkt);
        });
    }

    public removeEigenschaft(eigenschaft: IEigenschaft) {
        this.form.controls.eigenschaften.setValue(this.form.controls.eigenschaften.value.filter(e => e.id !== eigenschaft.id));
        this.produkt.set({ ...this.produkt(), eigenschaften: this.form.controls.eigenschaften.value });
    }

    public toggleEigenschaftEnthalten(eigenschaft: IEigenschaft) {
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
        const eigenschaft: IEigenschaft = await (await modal.onWillDismiss()).data;

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

            if (!this.produkt().eigenschaften.find(e => e.id === eigenschaft.id)) {
                this.produkt.update((produkt) => {
                    produkt.eigenschaften.push(eigenschaft);
                    return produkt;
                });
            }
        }
    }

    public save() {
        this.produkteService
            .update({ ...this.produkt(), ...this.form.value })
            .subscribe(p => {
                this.frontendService.showToast(`${p.name} wurde erfolgreich gespeichert!`);
                this.produkteService.readAll().subscribe(_ => this.load(this.id()));
            });
    }
}
