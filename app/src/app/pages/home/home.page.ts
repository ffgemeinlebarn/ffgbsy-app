import { Component } from '@angular/core';
import { NgModule } from '@angular/core';

import { HTTP } from '@ionic-native/http/ngx';
import { Injectable } from  '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

import { GlobalProviderService } from '../../providers/global-provider/global-provider.service';
import { System } from '../../interfaces/system';
import { StatusPipe } from '../../pipes/status/status.pipe';
import { DataProviderService } from '../../providers/data-provider/data-provider.service';
import { Drucker } from '../../classes/drucker.class';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  online: System;
  data_update: boolean;
  
  constructor(private http: HttpClient, private global: GlobalProviderService, public daten: DataProviderService) {

  }
  
  ngOnInit() {

    this.global.system.connectivity.wlan_aktiv = true;
    this.global.system.connectivity.lan_erreichbar = true;

    this.data_update = false;
    this.http.get<System>(this.global.api.baseUrl + '/status').subscribe(data => {
      this.online = data;
      this.data_update = this.online.data_version > this.daten.daten.version;



      for(let i=0;i<this.online.drucker.length;i++){
        this.checkDrucker(this.online.drucker[i]);
      }
    },
    err => {
      console.log("Error occured: ", err);
    });
  }

  checkDrucker(drucker: Drucker){
    let start = new Date();
    this.http.get<any>('http://'+drucker.ip).subscribe(data => {
      let now = new Date();
      drucker.ping.erreichbar = true;
      drucker.ping.leverage = (now.getSeconds()*10 + now.getMilliseconds()) - (start.getSeconds()*10 + start.getMilliseconds());
    },
    err => {
      drucker.ping.erreichbar = false;
    });
  }
}
