import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { IProduktbereich } from 'src/app/model/i-produktbereich.interface';

import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
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
import { map, mergeMap, tap } from 'rxjs';
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
export class ProduktbereicheDetailPage implements OnInit {
    private readonly produktbereicheApiService = inject(ProduktbereicheApiService);
    private readonly druckerApiService = inject(DruckerApiService);
    private readonly frontendService = inject(FrontendService);
    private readonly formBuilder = inject(FormBuilder);
    private readonly activatedRoute = inject(ActivatedRoute);

    public readonly drucker = toSignal(this.druckerApiService.readAll());

    public readonly produktbereich = signal<IProduktbereich | null>(null);

    public form: FormGroup = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(1)]],
        color: [''],
        drucker_id_level_0: [null],
    });

    constructor() {
        effect(() => {
            if (this.produktbereich()) {
                this.form.patchValue(this.produktbereich());
            }
        });
    }

    ngOnInit(): void {
        this.activatedRoute.params
            .pipe(
                map((p: Params) => Number(p['id']) ?? null),
                map((n) => (Number.isNaN(n) ? null : n)),
                mergeMap((id) => this.produktbereicheApiService.read(id)),
                tap((p) => {
                    console.debug('[FFGBSY]', 'Selected Produktbereich =>', p);
                }),
            )
            .subscribe((p) => this.produktbereich.set(p));
    }

    public save() {
        const updated = { ...this.produktbereich(), ...this.form.value };
        updated.bestand = updated.unlimitiert ? null : updated.bestand;
        console.debug('[FFGBSY]', 'ProduktbereicheDetailPage', 'save(), Updated Product:', updated);

        this.produktbereicheApiService.update(updated).subscribe((p) => {
            this.frontendService.showToast(`${p.name} wurde erfolgreich gespeichert!`);
            this.produktbereich.set(p);
        });
    }
}
