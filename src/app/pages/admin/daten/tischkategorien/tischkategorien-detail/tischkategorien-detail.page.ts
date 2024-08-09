import { Component, effect, inject, input, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonBackButton, IonButton, IonButtons, IonChip, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonSelect, IonSelectOption, IonSpinner, IonTitle, IonToggle, IonToolbar } from "@ionic/angular/standalone";
import { Tischkategorie } from 'src/app/classes/tischkategorie.class';
import { PageSpinnerComponent } from 'src/app/components/page-spinner/page-spinner.component';
import { FrontendService } from 'src/app/services/frontend/frontend.service';
import { ProduktkategorienService } from 'src/app/services/produktkategorien/produktkategorien.service';
import { TischkategorienService } from 'src/app/services/tischkategorien/tischkategorien.service';

@Component({
    selector: 'ffgbsy-tischkategorien-detail',
    templateUrl: './tischkategorien-detail.page.html',
    styleUrls: ['./tischkategorien-detail.page.scss'],
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
export class TischkategorienDetailPage {
    private tischkategorienService = inject(TischkategorienService);
    private produktkategorienService = inject(ProduktkategorienService);
    private frontendService = inject(FrontendService);
    private formBuilder = inject(FormBuilder);

    public id = input.required<number>();

    public produktkategorien = toSignal(this.produktkategorienService.readAll());
    public tischkategorie = signal<Tischkategorie>(null);

    public form: FormGroup = this.formBuilder.group({
        name: ["", [Validators.required, Validators.minLength(1)]],
        aktiv: [true],
        sortierindex: [100, [Validators.min(0)]]
    });

    constructor() {
        effect(() => this.tischkategorienService.read(this.id()).subscribe((tischkategorie: Tischkategorie) => this.setEntity(tischkategorie)));
    }

    private setEntity(tischkategorie: Tischkategorie) {
        this.tischkategorie.set(tischkategorie);
        this.form.patchValue(tischkategorie);
    }

    public save() {
        const updated = { ...this.tischkategorie(), ...this.form.value };
        console.debug("TischkategorienDetailPage", "save(), Updated Product:", updated);
        this.tischkategorienService
            .update(updated)
            .subscribe(tischkategorie => {
                this.frontendService.showToast(`${tischkategorie.name} wurde erfolgreich gespeichert!`);
                this.setEntity(tischkategorie);
            });
    }
}
