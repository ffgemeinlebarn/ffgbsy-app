import { ChangeDetectionStrategy, Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import {
    AlertController,
    IonBackButton,
    IonButton,
    IonButtons,
    IonChip,
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonItemDivider,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonLabel,
    IonList,
    IonSelect,
    IonSelectOption,
    IonTitle,
    IonToggle,
    IonToolbar,
    ModalController,
} from '@ionic/angular/standalone';
import { map, mergeMap, of, tap } from 'rxjs';
import { DruckerApiService } from '../../../../../data/api/drucker-api.service';
import { GrundprodukteApiService } from '../../../../../data/api/grundprodukte-api.service';
import { ProdukteApiService } from '../../../../../data/api/produkte-api.service';
import { ProdukteinteilungenApiService } from '../../../../../data/api/produkteinteilungen-api.service';
import { FrontendService } from '../../../../../data/frontend.service';
import { SelectEigenschaftModalComponent } from '../../../../../feature/select-eigenschaft-modal/select-eigenschaft-modal.component';
import { EuroPreisPipe } from '../../../../../misc/euro-preis.pipe';
import { IEigenschaft } from '../../../../../model/i-eigenschaft.interface';
import { IProdukt } from '../../../../../model/i-produkt.interface';
import { PageSpinnerComponent } from '../../../../../ui/page-spinner/page-spinner.component';

@Component({
    selector: 'ffgbsy-produkte-detail',
    templateUrl: './produkte-detail.page.html',
    styleUrls: ['./produkte-detail.page.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        IonItemSliding,
        IonItemOptions,
        IonItemOption,
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
        PageSpinnerComponent,
    ],
})
export class ProdukteDetailPage implements OnInit {
    private frontendService = inject(FrontendService);
    private produkteApiService = inject(ProdukteApiService);
    private produkteinteilungenApiService = inject(ProdukteinteilungenApiService);
    private grundprodukteApiService = inject(GrundprodukteApiService);
    private druckerApiService = inject(DruckerApiService);
    private formBuilder = inject(FormBuilder);
    private modalController = inject(ModalController);
    private alertController = inject(AlertController);
    private readonly activatedRoute = inject(ActivatedRoute);

    public readonly produkt = signal<IProdukt | null>(null);
    public drucker = toSignal(this.druckerApiService.readAll());
    public produkteinteilungen = toSignal(this.produkteinteilungenApiService.readAll());
    public grundprodukte = toSignal(this.grundprodukteApiService.readAll());
    public showGrundproduktMultiplikator = computed(() => this.produkt()?.grundprodukte_id != null);

    public form: FormGroup = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(1)]],
        formal_name: ['', [Validators.required, Validators.minLength(1)]],
        preis: [0, [Validators.required, Validators.min(0)]],
        sortierindex: [100, [Validators.min(0)]],
        aktiv: [false, [Validators.required]],
        celebration_active: [false, [Validators.required]],
        celebration_last: [0, [Validators.required]],
        drucker_id_level_2: [null],
        produkteinteilungen_id: [1, [Validators.nullValidator]],
        grundprodukte_id: [null],
        grundprodukte_multiplikator: [null],
        eigenschaften: [[]],
        hauptspeise: [false],
    });

    constructor() {
        effect(() => {
            if (this.produkt()) {
                this.form.patchValue(this.produkt());
            }
        });

        // this.form.controls['grundprodukte_id'].valueChanges.subscribe((id) => this.showGrundproduktMultiplikator.set(id != null));
    }
    ngOnInit(): void {
        this.activatedRoute.params
            .pipe(
                map((p: Params) => Number(p['id']) ?? null),
                map((n) => (Number.isNaN(n) ? null : n)),
                mergeMap((id) => {
                    if (id) {
                        return this.produkteApiService.read(id);
                    } else {
                        return of({ grundprodukt: null, eigenschaften: [] } as IProdukt);
                    }
                }),
                tap((p) => {
                    console.log('[FFGBSY]', 'Produkt =>', p);
                }),
            )
            .subscribe((p) => this.produkt.set(p));
    }

    public removeEigenschaft(eigenschaft: IEigenschaft) {
        this.form.controls.eigenschaften.setValue(this.form.controls.eigenschaften.value.filter((e) => e.id !== eigenschaft.id));
        this.produkt.set({
            ...this.produkt(),
            eigenschaften: this.form.controls.eigenschaften.value,
        });
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

            if (!this.produkt().eigenschaften.find((e) => e.id === eigenschaft.id)) {
                this.produkt.update((produkt) => {
                    produkt.eigenschaften.push(eigenschaft);
                    return produkt;
                });
            }
        }
    }

    public save() {
        const product = { ...this.produkt(), ...this.form.value };

        if (product.id) {
            this.produkteApiService.update(product).subscribe((p) => {
                this.frontendService.showToast(`${p.name} wurde erfolgreich gespeichert!`);
                this.produkt.set(p);
            });
        } else {
            this.produkteApiService.create(product).subscribe((p) => {
                this.frontendService.showToast(`${p.name} wurde erfolgreich gespeichert!`);
                this.produkt.set(p);
            });
        }
    }
}
