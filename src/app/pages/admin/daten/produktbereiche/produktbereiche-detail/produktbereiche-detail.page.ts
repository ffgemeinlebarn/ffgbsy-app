import { Component, effect, inject, input, signal } from '@angular/core';
import { IProduktbereich } from 'src/app/model/i-produktbereich.interface';

import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonSelect,
    IonSelectOption,
    IonTitle,
    IonToolbar,
} from '@ionic/angular/standalone';
import { DruckerApiService } from 'src/app/data/api/drucker-api.service';
import { ProduktbereicheApiService } from 'src/app/data/api/produktbereiche-api.service';
import { FrontendService } from 'src/app/data/frontend.service';
import { PageSpinnerComponent } from 'src/app/ui/page-spinner/page-spinner.component';

@Component({
    selector: 'ffgbsy-produktbereiche-detail',
    templateUrl: './produktbereiche-detail.page.html',
    styleUrls: ['./produktbereiche-detail.page.scss'],
    imports: [
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
        IonInput,
        IonSelect,
        IonSelectOption,
        FormsModule,
        ReactiveFormsModule,
        PageSpinnerComponent,
    ],
})
export class ProduktbereicheDetailPage {
    private produktbereicheApiService = inject(ProduktbereicheApiService);
    private druckerApiService = inject(DruckerApiService);
    private frontendService = inject(FrontendService);
    private formBuilder = inject(FormBuilder);

    public id = input.required<number>();

    public drucker = toSignal(this.druckerApiService.readAll());
    public produktbereich = signal<IProduktbereich>(null);
    public form: FormGroup = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(1)]],
        color: [''],
        drucker_id_level_0: [null],
    });

    constructor() {
        effect(() => this.load(this.id()));
    }

    private load(id: number) {
        this.produktbereicheApiService.read(id).subscribe((produktbereich: IProduktbereich) => {
            this.produktbereich.set(produktbereich);
            this.form.patchValue(produktbereich);
        });
    }

    public save() {
        const updated = { ...this.produktbereich(), ...this.form.value };
        updated.bestand = updated.unlimitiert ? null : updated.bestand;
        console.debug('[FFGBSY]', 'ProduktbereicheDetailPage', 'save(), Updated Product:', updated);
        this.produktbereicheApiService.update(updated).subscribe((p) => {
            this.frontendService.showToast(`${p.name} wurde erfolgreich gespeichert!`);
            this.load(this.id());
            this.reload();
        });
    }

    private reload() {
        this.produktbereicheApiService.readAll();
    }
}
