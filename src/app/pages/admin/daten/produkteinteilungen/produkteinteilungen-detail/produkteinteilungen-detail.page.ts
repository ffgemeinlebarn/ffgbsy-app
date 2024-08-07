import { Component, effect, inject, input, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonBackButton, IonButton, IonButtons, IonChip, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonSelect, IonSelectOption, IonSpinner, IonTitle, IonToggle, IonToolbar } from "@ionic/angular/standalone";
import { Produkteinteilung } from 'src/app/classes/produkteinteilung.class';
import { PageSpinnerComponent } from 'src/app/components/page-spinner/page-spinner.component';
import { FrontendService } from 'src/app/services/frontend/frontend.service';
import { ProdukteinteilungenService } from 'src/app/services/produkteinteilungen/produkteinteilungen.service';
import { ProduktkategorienService } from 'src/app/services/produktkategorien/produktkategorien.service';

@Component({
    selector: 'ffgbsy-produkteinteilungen-detail',
    templateUrl: './produkteinteilungen-detail.page.html',
    styleUrls: ['./produkteinteilungen-detail.page.scss'],
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
export class ProdukteinteilungenDetailPage {
    private produkteinteilungenService = inject(ProdukteinteilungenService);
    private produktkategorienService = inject(ProduktkategorienService);
    private frontendService = inject(FrontendService);
    private formBuilder = inject(FormBuilder);

    public id = input.required<number>();

    public produktkategorien = toSignal(this.produktkategorienService.readAll());
    public produkteinteilung = signal<Produkteinteilung>(null);

    public form: FormGroup = this.formBuilder.group({
        name: ["", [Validators.required, Validators.minLength(1)]],
        sortierindex: [100, [Validators.min(0)]],
        produktkategorien_id: [null],
    });

    constructor() {
        effect(() => this.load(this.id()));
    }

    private load(id: number) {
        this.produkteinteilungenService.read(id).subscribe((produkteinteilung: Produkteinteilung) => {
            this.produkteinteilung.set(produkteinteilung);
            this.form.patchValue(produkteinteilung);
        });
    }

    public save() {
        const updated = { ...this.produkteinteilung(), ...this.form.value };
        console.debug("ProdukteinteilungenDetailPage", "save(), Updated Product:", updated);
        this.produkteinteilungenService
            .update(updated)
            .subscribe(p => {
                this.frontendService.showToast(`${p.name} wurde erfolgreich gespeichert!`);
                this.load(this.id());
                this.reload();
            });
    }

    private reload() {
        this.produkteinteilungenService.readAll();
    }
}
