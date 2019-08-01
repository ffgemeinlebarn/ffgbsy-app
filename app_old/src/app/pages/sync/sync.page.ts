import { Component, OnInit } from '@angular/core';

import { GlobalProviderService } from '../../providers/global-provider/global-provider.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { DataProviderService } from '../../providers/data-provider/data-provider.service';
import { Daten } from '../../interfaces/daten';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-sync',
  templateUrl: './sync.page.html',
  styleUrls: ['./sync.page.scss'],
})
export class SyncPage {

  sync_beendet: boolean = false;

  constructor(public global: GlobalProviderService, public http: HttpClient, public dataProvider: DataProviderService, private navCtrl: NavController) {
    this.http.get<Daten>(this.global.api.baseUrl + '/daten/latest').subscribe(data => {
      this.dataProvider.storeOnlineData(data);
      this.dataProvider.resolve().then(_ => {
        this.sync_beendet = true;
      });
    },
    err => {
      console.log("Error occured: ", err);
    });   
  }
}
