import { Component, effect, inject, input, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonBackButton, IonButton, IonButtons, IonChip, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonSelect, IonSelectOption, IonSpinner, IonTitle, IonToggle, IonToolbar } from "@ionic/angular/standalone";
import { Produktkategorie } from 'src/app/classes/produktkategorie.class';
import { PageSpinnerComponent } from 'src/app/components/page-spinner/page-spinner.component';
import { DruckerService } from 'src/app/services/drucker/drucker.service';
import { FrontendService } from 'src/app/services/frontend/frontend.service';
import { ProduktkategorienService } from 'src/app/services/produktkategorien/produktkategorien.service';

@Component({
    selector: 'ffgbsy-produktkategorie-detail',
    templateUrl: './produktkategorie-detail.page.html',
    styleUrls: ['./produktkategorie-detail.page.scss'],
    standalone: true,
    imports: [
        IonChip,
        IonSpinner,
        IonItemDivider,
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
        PageSpinnerComponent
    ],
})
export class ProduktkategorieDetailPage {
    private produktkategorienService = inject(ProduktkategorienService);
    private druckerService = inject(DruckerService);
    private frontendService = inject(FrontendService);
    private formBuilder = inject(FormBuilder);

    public id = input.required<number>();

    public drucker = toSignal(this.druckerService.readAll());
    public produktkategorie = signal<Produktkategorie>(null);

    public form: FormGroup = this.formBuilder.group({
        name: ["", [Validators.required, Validators.minLength(1)]],
        color: [""],
        drucker_id_level_1: [null],
        sortierindex: [100, [Validators.min(0)]],
        produktbereich: [{}],
    });

    constructor() {
        effect(() => this.load(this.id()));
    }

    private load(id: number) {
        this.produktkategorienService.read(id).subscribe((produktkategorie: Produktkategorie) => {
            this.produktkategorie.set(produktkategorie);
            this.form.patchValue(produktkategorie);
        });
    }

    public save() {
        const updated = { ...this.produktkategorie(), ...this.form.value };
        console.debug("ProduktkategorienDetailPage", "save(), Updated Product:", updated);
        this.produktkategorienService
            .update(updated)
            .subscribe(p => {
                this.frontendService.showToast(`${p.name} wurde erfolgreich gespeichert!`);
                this.load(this.id());
                this.reload();
            });
    }

    private reload() {
        this.produktkategorienService.readAll();
    }
}
