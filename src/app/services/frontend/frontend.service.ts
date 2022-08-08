import { Injectable } from '@angular/core';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class FrontendService {

    public toast: any;
    public alert: any;

    public loadingSpinnerActiveCount: number = 0;
    public loadingSpinnerMessage: string = '';

    constructor(
        public toastController: ToastController,
        public alertController: AlertController,
        public loadingController: LoadingController
    ) { }

    public showLoadingSpinner(message: string = '') {
        this.loadingSpinnerMessage = message;
        this.loadingSpinnerActiveCount++;
        console.log("[FFGBSY]", "Show Loading Spinner", "Number =", this.loadingSpinnerActiveCount);
    }

    public hideLoadingSpinner() {
        this.loadingSpinnerActiveCount--;
        console.log("[FFGBSY]", "Hide Loading Spinner", "Number =", this.loadingSpinnerActiveCount);
    }

    showOkAlert(header, message) {
        return new Promise((resolve) => {

            this.alertController.create({
                header: header,
                message: message,
                buttons: [{
                    text: 'OK',
                    handler: (_) => {
                        resolve(true);
                    }
                }]
            }).then((alert) => {
                this.alert = alert;
                this.alert.present();
            });

        });
    }

    showJaNeinAlert(header, message) {

        return new Promise((resolve, reject) => {

            this.alertController.create({
                header: header,
                message: message,
                buttons: [
                    {
                        text: 'Nein',
                        role: 'Nein',
                        cssClass: 'secondary',
                        handler: (_) => {
                            reject();
                        }
                    }, {
                        text: 'Ja',
                        cssClass: 'primary',
                        handler: () => {
                            resolve(true);
                        }
                    }
                ]
            }).then((alert) => {
                this.alert = alert;
                this.alert.present();
            });

        });

    }

    async showToast(msg, duration = 2000) {

        this.toast = await this.toastController.create({
            message: msg,
            duration: duration
        });

        this.toast.present();
    }
}
