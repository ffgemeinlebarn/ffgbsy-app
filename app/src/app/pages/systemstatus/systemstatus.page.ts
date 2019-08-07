import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FrontendService } from 'src/app/services/frontend/frontend.service';
import { SessionService } from 'src/app/services/session/session.service';
import { DataService } from 'src/app/services/data/data.service';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { Bestellung } from 'src/app/classes/bestellung.class';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-systemstatus',
  templateUrl: './systemstatus.page.html',
  styleUrls: ['./systemstatus.page.scss'],
})
export class SystemstatusPage implements OnInit {

  public systemstatus: any = null;

  constructor(
    private http: HttpClient,
    private settings: SettingsService, 
    private frontend: FrontendService) { }

  ngOnInit() { }

  systemstatusAbrufen(){
    return new Promise((resolve, reject) => {
      
      this.frontend.showLoadingSpinner();
      this.http.get<any>(this.settings.api.url + '/systemstatus').subscribe(systemstatus => {
        this.systemstatus = systemstatus;
        this.frontend.hideLoadingSpinner();
        resolve();
      },
      err => {
        this.frontend.hideLoadingSpinner();
        reject(err);
        console.log("Error occured: ", err);
      });

    });
  }

}
