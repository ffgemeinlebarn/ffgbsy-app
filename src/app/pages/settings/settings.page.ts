import { Component, effect, inject } from '@angular/core';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LocalSettings } from 'src/app/interfaces/settings';

@Component({
    selector: 'ffgbsy-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
    standalone: true,
    imports: [IonicModule, ReactiveFormsModule],
})
export class SettingsPage {
    private settings = inject(SettingsService);

    public form = new FormGroup({
        notificationPoll: new FormControl(),
        deviceName: new FormControl(),
        adminPin: new FormControl(),
        apiBaseUrl: new FormControl()
    });

    constructor() {
        effect(() => {
            this.form.patchValue({
                notificationPoll: this.settings.local().notificationPoll,
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
