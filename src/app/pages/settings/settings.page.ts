import { Component, effect, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
    IonButton,
    IonButtons,
    IonChip,
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonMenuButton,
    IonTitle,
    IonToggle,
    IonToolbar,
} from '@ionic/angular/standalone';
import { AppService } from 'src/app/data/app.service';
import { SettingsService } from 'src/app/data/settings.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'ffgbsy-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
    imports: [
        IonChip,
        IonList,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonButtons,
        IonButton,
        IonMenuButton,
        IonContent,
        IonLabel,
        IonItem,
        IonIcon,
        IonToggle,
        IonInput,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class SettingsPage {
    private readonly settings = inject(SettingsService);
    private readonly app = inject(AppService);
    private readonly formBuilder = inject(FormBuilder);

    public adminFeatureIsActivated = this.app.isAdmin;

    public form = this.formBuilder.group({
        deviceName: ['', [Validators.required, Validators.minLength(1)]],
        deviceIsPrivate: [false, [Validators.required]],
        adminPin: [''],
        bonDebugMenu: [false, [Validators.required]],
        apiBaseUrl: [environment.api, [Validators.required]],
    });

    constructor() {
        effect(() => {
            this.form.patchValue(this.settings.local());
        });
    }

    public save() {
        this.settings.saveLocal({
            ...this.settings.local(),
            ...this.form.value,
            deviceAufnehmerId: this.form.controls['deviceIsPrivate'].value ? this.app.aufnehmer()?.id : undefined,
        });
    }
}
