import { Component, effect, inject, input, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonBackButton, IonButton, IonButtons, IonChip, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonSelect, IonSelectOption, IonTitle, IonToggle, IonToolbar } from "@ionic/angular/standalone";
import { Tisch } from 'src/app/classes/tisch.class';
import { PageSpinnerComponent } from 'src/app/components/page-spinner/page-spinner.component';
import { EuroPreisPipe } from 'src/app/pipes/euro-preis/euro-preis.pipe';
import { FrontendService } from 'src/app/services/frontend/frontend.service';
import { TischeService } from 'src/app/services/tische/tische.service';
import { TischkategorienService } from 'src/app/services/tischkategorien/tischkategorien.service';

@Component({
    selector: 'ffgbsy-tische-detail',
    templateUrl: './tische-detail.page.html',
    styleUrls: ['./tische-detail.page.scss'],
    standalone: true,
    imports: [IonItemDivider, IonChip, IonLabel, IonItem, IonList, IonIcon, IonButtons, IonTitle, IonBackButton, IonToolbar, IonHeader, IonContent, IonButton,
        IonInput, IonSelect, IonSelectOption, FormsModule,
        EuroPreisPipe, PageSpinnerComponent,
        ReactiveFormsModule, IonToggle
    ],
})
export class TischeDetailPage {
    private frontendService = inject(FrontendService);
    private tischeService = inject(TischeService);
    private tischkategorienService = inject(TischkategorienService);
    private formBuilder = inject(FormBuilder);

    public id = input.required<number>();
    public tisch = signal<Tisch>(null);
    public tischkategorien = toSignal(this.tischkategorienService.readAll());

    public form: FormGroup = this.formBuilder.group({
        reihe: ["", [Validators.required, Validators.minLength(1)]],
        nummer: [0, [Validators.required, Validators.min(1)]],
        aktiv: [true],
        sortierindex: [100, [Validators.min(0)]],
        tischkategorien_id: [null, [Validators.required, Validators.nullValidator]],
    });

    constructor() {
        effect(() => this.tischeService.read(this.id()).subscribe((tisch) => this.setEntity(tisch)));
    }

    private setEntity(tisch: Tisch) {
        this.tisch.set(tisch);
        this.form.patchValue(tisch);
    }

    public save() {
        if (this.form.invalid) {
            this.frontendService.showToast(`Es ist ein Fehler aufgetreten! Der Tisch wurde nicht gespeichert!`);
            return;
        }

        this.tischeService
            .update({ ...this.tisch(), ...this.form.value })
            .subscribe(tisch => {
                this.frontendService.showToast(`${tisch.reihe}${tisch.nummer} wurde erfolgreich gespeichert!`);
                this.setEntity(tisch);
            });
    }
}
