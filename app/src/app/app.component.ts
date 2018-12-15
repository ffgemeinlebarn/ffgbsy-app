import { Component } from '@angular/core';

import { Platform, NavController, AlertController, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { GlobalProviderService } from './providers/global-provider/global-provider.service';
import { BestellungenPage } from './pages/bestellungen/bestellungen.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public global: GlobalProviderService,
    public router: Router,
    public alertController: AlertController,
    public menuCtrl: MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async logout(){
    const alert = await this.alertController.create({
      header: 'Logoutn',
      message: 'Wollen Sie sich wirklich abmelden?',
      buttons: [
        {
          text: 'Nein',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => { }
        }, {
          text: 'Ja',
          cssClass: 'primary',
          handler: () => {
            this.global.logout();
            this.menuCtrl.close();
            this.router.navigateByUrl('/home');
          }
        }
      ]
    });

    await alert.present();    
  }
}
