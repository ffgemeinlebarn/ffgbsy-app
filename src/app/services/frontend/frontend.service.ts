import { Injectable } from '@angular/core';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class FrontendService {

    public toast: any;
    public alert: any;
    public loadingSpinner: any;

    constructor(
        public toastController: ToastController,
        public alertController: AlertController,
        public loadingController: LoadingController) {

    }

    showLoadingSpinner() {
        this.loadingController.create({
            spinner: 'lines-small',
            message: 'FFGBSY Schnitstelle',
            translucent: true
        }).then(loading => {
            this.loadingSpinner = loading;
            this.loadingSpinner.present();
        });

    }

    hideLoadingSpinner() {
        if (this.loadingSpinner) {
            this.loadingSpinner.dismiss();
        } else {
            let tmp_this = this;
            setTimeout(function () {
                tmp_this.hideLoadingSpinner();
            }, 300);
        }
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
