import { Component, effect, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonMenuButton, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { LocalSettings } from 'src/app/interfaces/settings';
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
        IonInput,
        FormsModule,
        ReactiveFormsModule
    ],
})
export class SettingsPage {
    private settings = inject(SettingsService);
    private formBuilder = inject(FormBuilder);

    public form = this.formBuilder.group({
        deviceName: ["", [Validators.required, Validators.minLength(1)]],
        adminPin: [""],
        apiBaseUrl: [environment.api, [Validators.required]],
    });

    constructor() {
        effect(() => {
            this.form.patchValue({
                deviceName: this.settings.local().deviceName,
                adminPin: this.settings.local().adminPin,
                apiBaseUrl: this.settings.local().apiBaseUrl
            });
        });
    }

    save() {
        this.settings.saveLocal(this.form.value as LocalSettings);
    }
}
