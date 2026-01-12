import { Injectable, inject, signal } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular/standalone';

@Injectable({
    providedIn: 'root',
})
export class FrontendService {
    private toastController = inject(ToastController);
    private alertController = inject(AlertController);

    public toast: any;
    public alert: any;

    public loadingSpinnerActiveCount = signal(0);
    public loadingSpinnerMessage: string = '';

    public showLoadingSpinner(message: string = '') {
        this.loadingSpinnerMessage = message;
        this.loadingSpinnerActiveCount.update((c) => c + 1);
        console.debug('[FFGBSY] Show Loading', 'Number =', this.loadingSpinnerActiveCount());
    }

    public hideLoadingSpinner(): void {
        console.debug('[FFGBSY] Hide Loading', 'Number =', this.loadingSpinnerActiveCount());
        if (this.loadingSpinnerActiveCount() > 0) {
            this.loadingSpinnerActiveCount.update((c) => c - 1);
        }
    }

    showOkAlert(header: string, message: string) {
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

    async showToast(msg: string, duration = 2000) {
        this.toast = await this.toastController.create({
            message: msg,
            duration: duration,
        });

        this.toast.present();
    }
}
