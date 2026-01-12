import { Injectable, computed, inject, signal } from '@angular/core';
import { AlertController, ModalController, ModalOptions, ToastController } from '@ionic/angular/standalone';
import { ComponentProps, ComponentRef } from '@ionic/core';
import { from, map, mergeMap, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class FrontendService {
    private readonly toastController = inject(ToastController);
    private readonly alertController = inject(AlertController);
    private readonly modalController = inject(ModalController);

    public alert: any;

    public readonly loadingSpinnerActiveCount = signal(0);
    public readonly loadingSpinnerMessage = signal('');
    public readonly loadingSpinnerShow = computed(() => this.loadingSpinnerActiveCount() > 0);

    public showLoadingSpinner(message: string = '') {
        this.loadingSpinnerMessage.set(message);
        this.loadingSpinnerActiveCount.update((c) => c + 1);
        console.debug('[FFGBSY] Show Loading', 'Number =', this.loadingSpinnerActiveCount());
    }

    public hideLoadingSpinner(): void {
        console.debug('[FFGBSY] Hide Loading', 'Number =', this.loadingSpinnerActiveCount());
        if (this.loadingSpinnerActiveCount() > 0) {
            this.loadingSpinnerActiveCount.update((c) => c - 1);
        }
    }

    public showOkAlert(header: string, message: string) {
        return new Promise((resolve) => {
            this.alertController
                .create({
                    header: header,
                    message: message,
                    buttons: [
                        {
                            text: 'OK',
                            handler: (_) => {
                                resolve(true);
                            },
                        },
                    ],
                })
                .then((alert) => {
                    this.alert = alert;
                    this.alert.present();
                });
        });
    }

    showJaNeinAlert(header: string, message: string) {
        return new Promise((resolve, reject) => {
            this.alertController
                .create({
                    header: header,
                    message: message,
                    buttons: [
                        {
                            text: 'Nein',
                            role: 'Nein',
                            cssClass: 'secondary',
                            handler: (_) => {
                                reject();
                            },
                        },
                        {
                            text: 'Ja',
                            cssClass: 'primary',
                            handler: () => {
                                resolve(true);
                            },
                        },
                    ],
                })
                .then((alert) => {
                    this.alert = alert;
                    this.alert.present();
                });
        });
    }

    showLog(log: any) {
        return new Promise((resolve) => {
            this.alertController
                .create({
                    header: log.timestamp,
                    message: log.additional,
                    cssClass: 'log-alert',
                    buttons: [
                        {
                            text: 'OK',
                            handler: (_) => {
                                resolve(true);
                            },
                        },
                    ],
                })
                .then((alert) => {
                    this.alert = alert;
                    this.alert.present();
                });
        });
    }

    public showToast(msg: string, duration = 2000) {
        from(this.toastController.create({ message: msg, duration: duration }))
            .pipe(switchMap((t) => t.present()))
            .subscribe();
    }

    public showModal<T extends ComponentRef = ComponentRef>(component: T, componentProps: ComponentProps<T> = undefined) {
        return from(
            this.modalController.create({
                component: component,
                componentProps: componentProps,
                cssClass: 'classic-modal',
                showBackdrop: true,
                backdropDismiss: false,
                animated: true,
            } as ModalOptions<T>),
        ).pipe(
            mergeMap((modal) => from(modal.present()).pipe(map(() => modal))),
            mergeMap((modal) => from(modal.onDidDismiss())),
        );
    }
}
