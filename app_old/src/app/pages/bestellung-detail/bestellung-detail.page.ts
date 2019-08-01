import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Bestellung } from '../../classes/bestellung.class';
import { GlobalProviderService } from '../../providers/global-provider/global-provider.service';
import { DataProviderService } from '../../providers/data-provider/data-provider.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bestellung-detail',
  templateUrl: './bestellung-detail.page.html',
  styleUrls: ['./bestellung-detail.page.scss'],
})
export class BestellungDetailPage implements OnInit {

  bestellung: Bestellung;

  constructor(public http: HttpClient, public global: GlobalProviderService, public daten: DataProviderService, private route: ActivatedRoute) {

    this.route.params.subscribe(params => {
      this.http.get<any>(this.global.api.baseUrl + '/bestellungen/'+params.id).subscribe(data => {
        this.bestellung = data;
      },
      err => {
        console.log("Error occured: ", err);
      });
    });

  }

  ngOnInit() {
  }

}
