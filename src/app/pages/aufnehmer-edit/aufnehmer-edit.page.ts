import { Component, effect, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonItemDivider,
    IonLabel,
    IonList,
    IonMenuButton,
    IonSelect,
    IonSelectOption,
    IonTitle,
    IonToolbar,
} from '@ionic/angular/standalone';
import { AufnehmerApiService } from 'src/app/data/api/aufnehmer-api.service';
import { AppService } from 'src/app/data/app.service';
import { FrontendService } from 'src/app/data/frontend.service';

@Component({
    selector: 'ffgbsy-aufnehmer-edit',
    templateUrl: './aufnehmer-edit.page.html',
    styleUrls: ['./aufnehmer-edit.page.scss'],
    imports: [
        IonInput,
        FormsModule,
        IonHeader,
        IonToolbar,
        IonMenuButton,
        IonTitle,
        IonButtons,
        IonButton,
        IonIcon,
        IonContent,
        IonList,
        IonItemDivider,
        IonLabel,
        IonItem,
        IonSelect,
        IonSelectOption,
        ReactiveFormsModule,
    ],
})
export class AufnehmerEditPage {
    private appService = inject(AppService);
    private readonly aufnehmerApiService = inject(AufnehmerApiService);
    private frontendService = inject(FrontendService);
    private formBuilder = inject(FormBuilder);

    public aufnehmer = this.appService.aufnehmer;

    constructor() {
        effect(() => this.form.patchValue(this.aufnehmer()));
    }

    public form = this.formBuilder.group({
        vorname: ['', [Validators.required, Validators.minLength(1)]],
        nachname: ['', [Validators.required, Validators.minLength(1)]],
        zoom_level: [1, [Validators.required]],
    });

    public save() {
        const updatedAufnehmer = { ...this.aufnehmer(), ...this.form.value };
        this.aufnehmerApiService.update(updatedAufnehmer).subscribe((a) => {
            this.frontendService.showToast(`${a.vorname} ${a.nachname} wurde gespeichert.`);
            this.aufnehmer.set(a);
        });
    }
}
