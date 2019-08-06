import { Injectable } from '@angular/core';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FrontendService {

  public toast: any;
  public alert: any;
  public loadingSpinner: any;

  constructor(public toastController: ToastController, public alertController: AlertController, public loadingController: LoadingController) {

  }

  showLoadingSpinner(sendOrReceive?, msg?){

    if (sendOrReceive === undefined && msg === undefined){
      sendOrReceive = 'receive';
      msg = 'Empfange Daten';
    } else if (sendOrReceive != 'receive' && msg === undefined){
      sendOrReceive == 'send';
      msg = 'Sende Daten';
    }

    this.loadingController.create({
      spinner: 'lines-small',
      message: msg,
      translucent: true
    }).then(loading => {
      this.loadingSpinner = loading;
      this.loadingSpinner.present();
    }); 

  }

  hideLoadingSpinner(){
    this.loadingSpinner.dismiss();
  }

  showOkAlert(header, message){
    return new Promise((resolve) => {

      this.alertController.create({
        header: header,
        message: message,
        buttons: [{
          text: 'OK',
          handler: (blah) => {
            resolve();
          }
        }]
      }).then((alert) => {
        this.alert = alert;
        this.alert.present();
      });
      
    });
  }

  showJaNeinAlert(header, message){

    return new Promise((resolve, reject) => {

      this.alertController.create({
        header: header,
        message: message,
        buttons: [
          {
            text: 'Nein',
            role: 'Nein',
            cssClass: 'secondary',
            handler: (blah) => {
              reject();
            }
          }, {
            text: 'Ja',
            cssClass: 'primary',
            handler: () => {
              resolve();
            }
          }
        ]
      }).then((alert) => {
        this.alert = alert;
        this.alert.present();
      });

    });

  }

  async showToast(msg, duration){

    this.toast = await this.toastController.create({
      message: msg,
      duration: duration
    });
    
    this.toast.present();
  }
}
