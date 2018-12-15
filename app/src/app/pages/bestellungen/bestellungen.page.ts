import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Bestellung } from '../../classes/bestellung.class';
import { GlobalProviderService } from '../../providers/global-provider/global-provider.service';
import { DataProviderService } from '../../providers/data-provider/data-provider.service';
import { ActivatedRoute } from '@angular/router';
import { Tisch } from '../../classes/tisch.class';

@Component({
  selector: 'app-bestellungen',
  templateUrl: './bestellungen.page.html',
  styleUrls: ['./bestellungen.page.scss'],
})
export class BestellungenPage implements OnInit {

  bestellungen: Array<Bestellung>;
  filtredBestellungen: Array<Bestellung>;
  filtredTische: Array<Tisch>;
  filtredTage: Array<any>;
  filter: any;

  constructor(public http: HttpClient, public global: GlobalProviderService, public daten: DataProviderService, private route: ActivatedRoute) {

    this.daten.feedFromLocalData();
    this.filtredTische = 
    this.filtredTage = [];

    this.filter = {
      aufnehmer_id: "all",
      tischkategorien_id: "all",
      tische_id: "all",
      tag: "all"
    };

    this.http.get<any>(this.global.api.baseUrl + '/bestellungen').subscribe(data => {
      this.bestellungen = data;
      this.filtredBestellungen = this.bestellungen;
      for(let b of this.filtredBestellungen){
        if (this.filtredTage.indexOf(new Date(b.timestamp_beendet).setHours(0,0,0,0)) == -1) this.filtredTage.push(new Date(b.timestamp_beendet).setHours(0,0,0,0));
      }
      
    },
    err => {
      console.log("Error occured: ", err);
    });
  }

  onFilterChange(){

    this.filtredBestellungen = [];

    for(let b of this.bestellungen){

      if (this.filter.aufnehmer_id != "all" && this.filter.aufnehmer_id != b.aufnehmer.id){  }
      else if (this.filter.tischkategorien_id != "all" && this.filter.tischkategorien_id != b.tisch.tischkategorien_id){ }
      else if (this.filter.tische_id != "all" && this.filter.tische_id != b.tisch.id){  }
      else if (this.filter.tag != "all" && new Date(this.filter.tag.replace( /(\d{2}).(\d{2}).(\d{4})/, "$2/$1/$3")).setHours(0,0,0,0) != new Date(b.timestamp_beendet).setHours(0,0,0,0)){  }
      else {
        this.filtredBestellungen.push(b);
      }
    }
  }

  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      if (params.aufnehmer_id){
        this.filter.aufnehmer_id = params.aufnehmer_id;
      }
    });
  }
}