import { Component, effect, inject, input, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { AufnehmerService } from 'src/app/data/aufnehmer.service';
import { FrontendService } from 'src/app/data/frontend.service';
import { IAufnehmer } from 'src/app/model/i-aufnehmer.model';

@Component({
    selector: 'ffgbsy-aufnehmer-detail',
    templateUrl: './aufnehmer-detail.page.html',
    styleUrls: ['./aufnehmer-detail.page.scss'],
    imports: [
        IonBackButton,
        IonIcon,
        IonButton,
        IonButtons,
        IonItem,
        IonLabel,
        IonList,
        IonContent,
        IonHeader,
        IonTitle,
        IonToolbar,
        IonSelect,
        IonSelectOption,
        IonToggle,
        IonInput,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class AufnehmerDetailPage {
    private aufnehmerService = inject(AufnehmerService);
    private frontendService = inject(FrontendService);
    private formBuilder = inject(FormBuilder);

    public id = input.required<number>();
    public aufnehmer = signal<IAufnehmer>(null);

    public form = this.formBuilder.group({
        vorname: ['', [Validators.required, Validators.minLength(1)]],
        nachname: ['', [Validators.required, Validators.minLength(1)]],
        zoom_level: [1, [Validators.required]],
        aktiv: [false, [Validators.required]],
    });

    constructor() {
        effect(() => this.load(this.id()));
    }

    public load(id: number) {
        this.aufnehmerService.read(id).subscribe((aufnehmer) => {
            this.aufnehmer.set(aufnehmer);
            this.form.patchValue(aufnehmer);
        });
    }

    public save() {
        this.aufnehmerService.update({ ...this.aufnehmer(), ...this.form.value }).subscribe((p) => {
            this.frontendService.showToast(`${p.name} wurde erfolgreich gespeichert!`);
            this.load(this.id());
        });
    }
}
