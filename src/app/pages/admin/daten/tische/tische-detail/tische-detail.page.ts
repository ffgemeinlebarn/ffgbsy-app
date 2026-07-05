import { ChangeDetectionStrategy, Component, effect, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonSelect, IonSelectOption, IonTitle, IonToggle, IonToolbar } from '@ionic/angular/standalone';
import { map, mergeMap, tap } from 'rxjs';
import { TischeApiService } from '../../../../../data/api/tische-api.service';
import { TischkategorienApiService } from '../../../../../data/api/tischkategorien-api.service';
import { FrontendService } from '../../../../../data/frontend.service';
import { TischDto } from '../../../../../model/dto/tisch.dto';
import { PageSpinnerComponent } from '../../../../../ui/page-spinner/page-spinner.component';

@Component({
    selector: 'ffgbsy-tische-detail',
    templateUrl: './tische-detail.page.html',
    styleUrls: ['./tische-detail.page.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [IonLabel, IonItem, IonList, IonIcon, IonButtons, IonTitle, IonBackButton, IonToolbar, IonHeader, IonContent, IonButton, IonInput, IonSelect, IonSelectOption, FormsModule, PageSpinnerComponent, ReactiveFormsModule, IonToggle],
})
export class TischeDetailPage implements OnInit {
    private readonly frontendService = inject(FrontendService);
    private readonly tischeApiService = inject(TischeApiService);
    private readonly tischkategorienApiService = inject(TischkategorienApiService);
    private readonly formBuilder = inject(FormBuilder);
    private readonly activatedRoute = inject(ActivatedRoute);

    public readonly tisch = signal<TischDto | null>(null);
    public readonly tischkategorien = toSignal(this.tischkategorienApiService.readAll());

    public form: FormGroup = this.formBuilder.group({
        reihe: ['', [Validators.required, Validators.minLength(1)]],
        nummer: [0, [Validators.required, Validators.min(1)]],
        aktiv: [true],
        sortierindex: [100, [Validators.min(0)]],
        tischkategorien_id: [null, [Validators.required, Validators.nullValidator]],
    });

    constructor() {
        effect(() => {
            if (this.tisch()) {
                this.form.patchValue(this.tisch());
            }
        });
    }

    ngOnInit(): void {
        this.activatedRoute.params
            .pipe(
                map((p: Params) => Number(p['id']) ?? null),
                map((n) => (Number.isNaN(n) ? null : n)),
                mergeMap((id) => this.tischeApiService.read(id)),
                tap((t) => {
                    console.debug('[FFGBSY]', 'Selected Tisch =>', t);
                }),
            )
            .subscribe((t) => this.tisch.set(t));
    }

    public save() {
        if (this.form.invalid) {
            this.frontendService.showToast(`Es ist ein Fehler aufgetreten! Der Tisch wurde nicht gespeichert!`);
            return;
        }

        this.tischeApiService.update({ ...this.tisch(), ...this.form.value }).subscribe((tisch) => {
            this.frontendService.showToast(`${tisch.reihe}${tisch.nummer} wurde erfolgreich gespeichert!`);
            this.tisch.set(tisch);
        });
    }
}
