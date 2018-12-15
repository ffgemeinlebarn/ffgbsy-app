import { Component, OnInit } from '@angular/core';

import { GlobalProviderService } from '../../providers/global-provider/global-provider.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { DataProviderService } from '../../providers/data-provider/data-provider.service';
import { Daten } from '../../interfaces/daten';

@Component({
  selector: 'app-sync',
  templateUrl: './sync.page.html',
  styleUrls: ['./sync.page.scss'],
})
export class SyncPage implements OnInit {

  sync_beendet: boolean = false;

  constructor(public global: GlobalProviderService, public http: HttpClient, public dataProvider: DataProviderService) {

  }

  ngOnInit() {
    
    this.http.get<Daten>(this.global.api.baseUrl + '/daten/latest').subscribe(data => {
      this.dataProvider.storeOnlineData(data);

      setTimeout(() => {
        this.dataProvider.feedFromLocalData();
        this.sync_beendet = true;
      }, 1000);
    },
    err => {
      console.log("Error occured: ", err);
    });   
  }
}
