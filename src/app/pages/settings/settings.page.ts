import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { form, FormField } from '@angular/forms/signals';
import { AlertController } from '@ionic/angular';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonMenuButton, IonSelect, IonSelectOption, IonTitle, IonToggle, IonToolbar } from '@ionic/angular/standalone';
import { from, map, mergeMap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AppService } from '../../data/app.service';
import { FrontendService } from '../../data/frontend.service';
import { SettingsService } from '../../data/settings.service';

@Component({
    selector: 'ffgbsy-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [IonList, IonHeader, IonSelect, IonSelectOption, IonToolbar, IonTitle, IonButtons, IonButton, IonMenuButton, IonContent, IonLabel, IonItem, IonIcon, IonToggle, IonInput, FormsModule, ReactiveFormsModule, FormField],
})
export class SettingsPage {
    private readonly settings = inject(SettingsService);
    private readonly app = inject(AppService);
    private readonly alertController = inject(AlertController);
    private readonly frontendService = inject(FrontendService);

    public readonly isUnlocked = signal(false);
    public readonly isFeatureAbrechnungenUnlocked = computed(() => this.settings.local().features.abrechnungen);
    public readonly isFeatureSystemUnlocked = computed(() => this.settings.local().features.system);

    public form = form(this.settings.local);

    public unlock() {
        from(
            this.alertController.create({
                header: 'PIN Code Eingabe',
                inputs: [
                    {
                        type: 'password',
                        name: 'code',
                        placeholder: 'PIN Code',
                        attributes: { inputmode: 'decimal', step: 1 },
                    },
                ],
                buttons: [
                    {
                        text: 'Unlock',
                    },
                ],
            }),
        )
            .pipe(
                mergeMap((modal) => from(modal.present()).pipe(map(() => modal))),
                mergeMap((modal) => from(modal.onDidDismiss())),
                map((result) => result?.data?.values?.code ?? null),
            )
            .subscribe((code: string) => {
                if (code == environment.localAdminPin) {
                    this.isUnlocked.set(true);
                } else {
                    this.frontendService.showToast('Ungültiger PIN!');
                }
            });
    }

    public save() {
        this.isUnlocked.set(false);

        this.settings.saveLocal({
            ...this.settings.local(),
            deviceAufnehmerId: this.form.deviceIsPrivate().value() ? this.app.aufnehmer()?.id : undefined,
        });
    }
}
