import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bestellung } from 'src/app/classes/bestellung.class';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { FrontendService } from 'src/app/services/frontend/frontend.service';
import { SessionService } from 'src/app/services/session/session.service';
import { DataService } from 'src/app/services/data/data.service';
import { ModalController, IonSelect } from '@ionic/angular';

@Component({
  selector: 'app-bestellungen',
  templateUrl: './bestellungen.page.html',
  styleUrls: ['./bestellungen.page.scss'],
})
export class BestellungenPage implements OnInit {

  public bestellungen: Array<Bestellung>;
  public filter: any = {
    aufnehmerId: null
  };

  constructor(
    private http: HttpClient, 
    private session: SessionService, 
    private data: DataService,
    private settings: SettingsService, 
    private frontend: FrontendService,
    private modalController: ModalController
  ) {
    this.filter.aufnehmerId = this.session.aufnehmer.id;
    this.getBestellungen();
  }

  ngOnInit() { }

  getBestellungen(){
    return new Promise((resolve, reject) => {
      
      this.frontend.showLoadingSpinner();
      this.http.get<Bestellung[]>(this.settings.api.url + '/bestellungen').subscribe(bestellungen => {

        console.log(bestellungen);
        this.bestellungen = bestellungen;
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

  @ViewChild(IonSelect, {static: false}) select: IonSelect;
  filterSelectAufnehmer(){
    this.select.open();
  }

}
