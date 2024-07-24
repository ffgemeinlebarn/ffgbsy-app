import { Component, effect, inject, input, signal } from '@angular/core';
import { Produktbereich } from 'src/app/classes/produktbereich.class';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonSpinner, IonTitle, IonToggle, IonToolbar } from "@ionic/angular/standalone";
import { PageSpinnerComponent } from 'src/app/components/page-spinner/page-spinner.component';
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
        FormsModule,
        ReactiveFormsModule,
        PageSpinnerComponent
    ],
})
export class ProduktbereicheDetailPage {
    private produktbereicheService = inject(ProduktbereicheService);
    private frontendService = inject(FrontendService);
    private formBuilder = inject(FormBuilder);

    public id = input.required<number>();

    public produktbereich = signal<Produktbereich>(null);
    public form: FormGroup = this.formBuilder.group({
        name: ["", [Validators.required, Validators.minLength(1)]],
        unlimitiert: [true, [Validators.required]],
        bestand: [null, [Validators.min(0)]],
        einheit: ["", []],
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
