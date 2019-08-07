import { Component, OnInit } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-imprint',
  templateUrl: './imprint.page.html',
  styleUrls: ['./imprint.page.scss'],
})
export class ImprintPage implements OnInit {

  public appName = null;
  public packageName = null;
  public versionCode = null;
  public versionNumber = null;

  constructor(private platform: Platform, private appVersion: AppVersion) {

    if (platform.is('android') || platform.is('ios')){
      platform.ready().then(() => {
        this.appVersion.getAppName().then(res => this.appName = res );
        this.appVersion.getPackageName().then(res => this.packageName = res );
        this.appVersion.getVersionCode().then(res => this.versionCode = res );
        this.appVersion.getVersionNumber().then(res => this.versionNumber = res );
      });
    }
  }

  ngOnInit() { }

}
