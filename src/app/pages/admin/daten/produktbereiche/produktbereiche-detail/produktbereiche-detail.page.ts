import { Component, effect, inject, input, signal } from '@angular/core';
import { Produktbereich } from 'src/app/classes/produktbereich.class';

import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonSelect, IonSelectOption, IonSpinner, IonTitle, IonToggle, IonToolbar } from "@ionic/angular/standalone";
import { PageSpinnerComponent } from 'src/app/components/page-spinner/page-spinner.component';
import { DruckerService } from 'src/app/services/drucker/drucker.service';
import { FrontendService } from 'src/app/services/frontend/frontend.service';
import { ProduktbereicheService } from 'src/app/services/produktbereiche/produktbereiche.service';

@Component({
    selector: 'ffgbsy-produktbereiche-detail',
    templateUrl: './produktbereiche-detail.page.html',
    styleUrls: ['./produktbereiche-detail.page.scss'],
    standalone: true,
    imports: [
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
export class ProduktbereicheDetailPage {
    private produktbereicheService = inject(ProduktbereicheService);
    private druckerService = inject(DruckerService);
    private frontendService = inject(FrontendService);
    private formBuilder = inject(FormBuilder);

    public id = input.required<number>();

    public drucker = toSignal(this.druckerService.readAll());
    public produktbereich = signal<Produktbereich>(null);
    public form: FormGroup = this.formBuilder.group({
        name: ["", [Validators.required, Validators.minLength(1)]],
        color: [""],
        drucker_id_level_0: [null],
    });

    constructor() {
        effect(() => this.load(this.id()));
    }

    private load(id: number) {
        this.produktbereicheService.read(id).subscribe((produktbereich: Produktbereich) => {
            this.produktbereich.set(produktbereich);
            this.form.patchValue(produktbereich);
        });
    }

    public save() {
        const updated = { ...this.produktbereich(), ...this.form.value };
        updated.bestand = updated.unlimitiert ? null : updated.bestand;
        console.debug("ProduktbereicheDetailPage", "save(), Updated Product:", updated);
        this.produktbereicheService
            .update(updated)
            .subscribe(p => {
                this.frontendService.showToast(`${p.name} wurde erfolgreich gespeichert!`);
                this.load(this.id());
                this.reload();
            });
    }

    private reload() {
        this.produktbereicheService.readAll();
    }
}
