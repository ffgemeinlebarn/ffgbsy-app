import { Component, effect, inject, input, signal } from '@angular/core';
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
    IonToggle,
    IonToolbar,
} from '@ionic/angular/standalone';
import { TischeApiService } from 'src/app/data/api/tische-api.service';
import { TischkategorienApiService } from 'src/app/data/api/tischkategorien-api.service';
import { FrontendService } from 'src/app/data/frontend.service';
import { ITisch } from 'src/app/model/i-tisch.interface';
import { PageSpinnerComponent } from 'src/app/ui/page-spinner/page-spinner.component';

@Component({
    selector: 'ffgbsy-tische-detail',
    templateUrl: './tische-detail.page.html',
    styleUrls: ['./tische-detail.page.scss'],
    imports: [
        IonLabel,
        IonItem,
        IonList,
        IonIcon,
        IonButtons,
        IonTitle,
        IonBackButton,
        IonToolbar,
        IonHeader,
        IonContent,
        IonButton,
        IonInput,
        IonSelect,
        IonSelectOption,
        FormsModule,
        PageSpinnerComponent,
        ReactiveFormsModule,
        IonToggle,
    ],
})
export class TischeDetailPage {
    private frontendService = inject(FrontendService);
    private tischeApiService = inject(TischeApiService);
    private tischkategorienApiService = inject(TischkategorienApiService);
    private formBuilder = inject(FormBuilder);

    public id = input.required<number>();
    public tisch = signal<ITisch>(null);
    public tischkategorien = toSignal(this.tischkategorienApiService.readAll());

    public form: FormGroup = this.formBuilder.group({
        reihe: ['', [Validators.required, Validators.minLength(1)]],
        nummer: [0, [Validators.required, Validators.min(1)]],
        aktiv: [true],
        sortierindex: [100, [Validators.min(0)]],
        tischkategorien_id: [null, [Validators.required, Validators.nullValidator]],
    });

    constructor() {
        effect(() => this.tischeApiService.read(this.id()).subscribe((tisch) => this.setEntity(tisch)));
    }

    private setEntity(tisch: ITisch) {
        this.tisch.set(tisch);
        this.form.patchValue(tisch);
    }

    public save() {
        if (this.form.invalid) {
            this.frontendService.showToast(`Es ist ein Fehler aufgetreten! Der Tisch wurde nicht gespeichert!`);
            return;
        }

        this.tischeApiService.update({ ...this.tisch(), ...this.form.value }).subscribe((tisch) => {
            this.frontendService.showToast(`${tisch.reihe}${tisch.nummer} wurde erfolgreich gespeichert!`);
            this.setEntity(tisch);
        });
    }
}
