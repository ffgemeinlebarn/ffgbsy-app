import { Component, effect, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonMenuButton, IonTitle, IonToggle, IonToolbar } from '@ionic/angular/standalone';
import { AppService } from 'src/app/services/app/app.service';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'ffgbsy-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
    standalone: true,
    imports: [
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
        IonItemDivider,
        IonIcon,
        IonToggle,
        IonInput,
        FormsModule,
        ReactiveFormsModule
    ],
})
export class SettingsPage {
    private settings = inject(SettingsService);
    private app = inject(AppService);
    private formBuilder = inject(FormBuilder);

    public form = this.formBuilder.group({
        deviceName: ["", [Validators.required, Validators.minLength(1)]],
        deviceIsPrivate: [false, [Validators.required]],
        adminPin: [""],
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
            deviceAufnehmerId: this.form.controls['deviceIsPrivate'].value ? this.app.aufnehmer()?.id : undefined
        });
    }
}
