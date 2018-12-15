import { Component, OnInit } from '@angular/core';
import { GlobalProviderService } from '../../providers/global-provider/global-provider.service';
import { Aufnehmer } from '../../classes/aufnehmer.class';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { DataProviderService } from '../../providers/data-provider/data-provider.service';

@Component({
  selector: 'app-select-aufnehmer',
  templateUrl: './select-aufnehmer.page.html',
  styleUrls: ['./select-aufnehmer.page.scss'],
})
export class SelectAufnehmerPage implements OnInit {

  aufnehmer: Array<Aufnehmer>;
  selectedAufnehmerId: number;

  constructor(public global: GlobalProviderService, public daten: DataProviderService){
    this.aufnehmer = daten.daten.aufnehmer;
    this.selectedAufnehmerId = this.aufnehmer[0].id;
    this.aufnehmerChange(this.aufnehmer[0]);
  }

  aufnehmerChange(aufnehmer: Aufnehmer){

    this.global.loggedIn = {
      status: true,
      aufnehmer: aufnehmer
    };
  }

  ngOnInit() {
  }

}
